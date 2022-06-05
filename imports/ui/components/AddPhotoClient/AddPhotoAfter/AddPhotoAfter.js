import React, { useState } from "react";
import snackBar from "../../../../libs/snackBar";
import { useTracker } from "meteor/react-meteor-data";

import "./style.scss";
import { ServicesCollection } from "../../../../api/services/services";
import { useParams } from "react-router-dom";
import { ImagesCollection } from "../../../../api/images/images";

const AddPhotoAfter = () => {
  const { id } = useParams();

  const service = useTracker(() => {
    Meteor.subscribe("services");
    return ServicesCollection.findOne(id);
  });

  const afterImg = useTracker(() => {
    Meteor.subscribe("images");
    return ImagesCollection.findOne(service?.galleryClient?.after);
  });
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState({
    localUrl: "",
    image: null,
  });
  const handleChange = (e) => {
    const image = e.target.files[0];

    const localUrl = window.URL.createObjectURL(image);
    setData({ image, localUrl });
  };
  const handleSubmit = async () => {
    if (
      service.isRejectedProvider ||
      service.isPending ||
      service.isInProgress
    ) {
      return snackBar.set("snackbar", {
        open: true,
        msg: "wait until provider finish the work",
        severity: "error",
      });
    }
    try {
      setIsUploading(true);
      let formData = new FormData();
      formData.append("image", data.image);
      let url = afterImg?.url;
      let publicId = afterImg?.publicId;
      let res;
      if (url) {
        res = await fetch(`https://ta3refchi.herokuapp.com/upload/edit/${publicId} `, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch(`https://ta3refchi.herokuapp.com/upload`, {
          method: "POST",
          body: formData,
        });
      }

      const resData = await res.json();

      if (res.ok) {
        if (url) {
          return Meteor.call(
            "images.update",
            afterImg._id,
            resData.url,
            resData.publicId,
            service._id,
            () => {
              snackBar.set("snackbar", {
                open: true,
                msg: "image updated successfully",
                severity: "success",
              });
              setData({ image: null, localUrl: "" });
              setIsUploading(false);
            }
          );
        }
        if (!url) {
          return Meteor.call(
            "images.insert",
            resData.url,
            resData.publicId,
            service._id,
            (err, id) => {
              Meteor.call(
                "ServicesCollection.imgClientAfter.update",
                service._id,
                id,
                () => {
                  snackBar.set("snackbar", {
                    open: true,
                    msg: "image uploaded successfully",
                    severity: "success",
                  });
                  setData({ image: null, localUrl: "" });
                  setIsUploading(false);
                }
              );
            }
          );
        }
      }
      if (!res.ok) {
        snackBar.set("snackbar", {
          open: true,
          msg: resData.error,
          severity: "error",
        });
      }
    } catch (error) {
      setIsUploading(false);
      //console.log(error);
      snackBar.set("snackbar", {
        open: true,
        msg: `Something went wrong`,
        severity: "error",
      });
    }
  };
  return (
    <div className="AddPhotoAfter">
      <input
        className="form-control"
        type="file"
        accept="image/*"
        name="image"
        onChange={handleChange}
        id="image"
        style={{
          display: "none",
        }}
      />
      <div className="AddPhotoClient__img-box">
        {data?.localUrl ? (
          <img src={data?.localUrl} alt="" />
        ) : afterImg ? (
          <img src={afterImg?.url} alt="" />
        ) : null}
      </div>

      <label
        htmlFor="image"
        className="AddPhotoClient__browsephoto AddPhotoClient__browsephoto--hidden"
      >
        Browse
      </label>
      {data.localUrl && (
        <button
          disabled={isUploading}
          className="btn btn-primary btn--upload"
          onClick={handleSubmit}
        >
          upload after service photo{" "}
        </button>
      )}
    </div>
  );
};

export default AddPhotoAfter;
