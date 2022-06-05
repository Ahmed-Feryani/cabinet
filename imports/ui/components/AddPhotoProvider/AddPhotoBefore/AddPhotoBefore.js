import React, { useState } from "react";
import snackBar from "../../../../libs/snackBar";
import { useTracker } from "meteor/react-meteor-data";


import { ServicesCollection } from "../../../../api/services/services";
import { useParams } from "react-router-dom";
import { ImagesCollection } from "../../../../api/images/images";

const AddPhotoBefore = () => {
  const { id } = useParams();

  const service = useTracker(() => {
    Meteor.subscribe("services");
    return ServicesCollection.findOne(id);
  });

  const beforeImg = useTracker(() => {
    Meteor.subscribe("images");
    return ImagesCollection.findOne(service?.galleryProvider?.before);
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
    try {
      setIsUploading(true);
      let formData = new FormData();
      formData.append("image", data.image);
      let url = beforeImg?.url;
      let publicId = beforeImg?.publicId;
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
            beforeImg._id,
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
                "ServicesCollection.imgProviderBefore.update",
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
    <div className="AddPhotoBefore">
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
        ) : beforeImg ? (
          <img src={beforeImg?.url} alt="" />
        ) : null}
      </div>

      <label
        htmlFor="image"
        className="AddPhotoProvider__browsephoto AddPhotoClient__browsephoto--hidden"
      >
        Browse
      </label>
      {data.localUrl && (
        <button
          disabled={isUploading}
          className="btn btn-primary btn--upload"
          onClick={handleSubmit}
        >
          upload before service photo{" "}
        </button>
      )}
    </div>
  );
};

export default AddPhotoBefore;
