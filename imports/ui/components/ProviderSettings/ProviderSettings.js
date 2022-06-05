import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import "./style.scss";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import EntryText from "../Entry/EntryText/EntryText";
import {
  optionsCategory,
  optionsSubCategory,
  optionsLocation,
} from "./options";
import EntrySelect from "../Entry/EntrySelect/EntrySelect";
import { BottomNavigation } from "@mui/material";
import snackBar from "../../../libs/snackBar";

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  birth: Yup.string().required("Last name is required"),
  category: Yup.string().required("Last name is required"),
  subCategory: Yup.string().required("Last name is required"),
  location: Yup.string().required("Last name is required"),
  bio: Yup.string(),
  tel: Yup.string().required("Last name is required"),
  email: Yup.string().required("Last name is required"),
});

const ProviderSettings = () => {
  const [data, setData] = useState({
    localUrl: "",
    image: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const user = useTracker(() => {
    return Meteor.user();
  });

  const INITIAL_STATE = useTracker(() => {
    return {
      name: user?.profile?.name,
      lastName: user?.profile?.lastName,
      birth: user?.profile?.birth,
      category: user?.profile?.professionalSpecialty || "",
      subCategory: user?.profile?.subCategory || "",
      location: user?.profile?.location || "",
      bio: user?.profile?.bio,
      tel: user?.profile?.tel,
      email: user?.emails[0]?.address,
    };
  });
  const handleChange = (e) => {
    const image = e.target.files[0];
    const localUrl = window.URL.createObjectURL(image);
    setData({ image, localUrl });
  };

  const handleSubmit = async (values, resetForm) => {
    if (!data.image) {
      return Meteor.call(
        "profile.update",
        values.bio,
        values.birth,
        values.location,
        values.category,
        values.subCategory,
        values.tel, () => {
          snackBar.set("snackbar", {
            open: true,
            msg: `Profile successfully Updated`,
            severity: "success",
          });
        }
      );
    }
    try {
      setIsUploading(true);
      let formData = new FormData();
      formData.append("image", data.image);
      let url = user?.profile?.avatar?.url;
      let publicId = user?.profile?.avatar?.publicId;
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
        Meteor.call(
          "profileAvatar.update",
          resData.url,
          resData.publicId,
          () => {
            setData({ image: null, localUrl: "" });
            setIsUploading(false);

            Meteor.call(
              "profile.update",
              values.bio,
              values.birth,
              values.location,
              values.category,
              values.subCategory,
              values.tel, () => {
                snackBar.set("snackbar", {
                  open: true,
                  msg: `Profile successfully Updated`,
                  severity: "success",
                });
              }
            );
          }
        );
      }
      if (!res.ok) {
        snackBar.set("snackbar", {
          open: true,
          msg: resData.error,
          severity: "error",
        });
      }
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);

      snackBar.set("snackbar", {
        open: true,
        msg: `Something went wrong`,
        severity: "error",
      });
    }
  };
  return (
    <div className="ProviderSettings">
      <h4 className="widget-title">Profile Settings</h4>
      <div className="row">
        <div className="form-group col-xl-12">
          <div className="media align-items-center mb-3 d-flex">
            <img
              className="user-image"
              src={data.localUrl ? data.localUrl : user?.profile?.avatar?.url}
              alt=""
            />
            <div className="media-body">
              <h5 className="mb-0"> {user?.profile?.fullName} </h5>
              <p>Max file size is 20mb</p>
              <div className="jstinput">
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                  id="avatar"
                  style={{
                    display: "none",
                  }}
                />
                <label
                  htmlFor="avatar"
                  className="ProviderSettings__browsephoto"
                >
                  Browse
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Formik
        enableReinitialize
        initialValues={{ ...INITIAL_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ isValid, dirty }) => {
          return (
            <Form>
              <div className="row">
                <div className="col-xl-12">
                  <h5 className="form-title">Basic Information</h5>
                </div>
              </div>

              <div className="row">
                <div className="form-group col-xl-6">
                  <label className="me-sm-2">Name</label>
                  <EntryText
                    disabled
                    name="name"
                    placeholder="Enter your Name"
                  ></EntryText>
                </div>
                <div className="form-group col-xl-6">
                  <label className="me-sm-2">Last name</label>
                  <EntryText
                    disabled
                    name="lastName"
                    placeholder="Enter your last name"
                  ></EntryText>
                </div>
                <div className="form-group col-xl-12">
                  <label className="me-sm-2">Email</label>
                  <EntryText disabled name="email"></EntryText>
                </div>
                <div className="form-group col-xl-6">
                  <label className="me-sm-2">Date of birth</label>
                  <EntryText type="date" name="birth"></EntryText>
                </div>
                <div className="form-group col-xl-6">
                  <label className="me-sm-2">Mobile Number</label>
                  <EntryText name="tel"></EntryText>
                </div>

                <div className="col-xl-12">
                  <h5 className="form-title">Service Info</h5>
                </div>
                <div className="form-group col-xl-6">
                  <label className="me-sm-2">
                    What Service do you Provide?
                  </label>
                  <EntrySelect
                    options={optionsCategory}
                    name="category"
                  ></EntrySelect>
                </div>
                <div className="form-group col-xl-6">
                  <label className="me-sm-2">Sub Category</label>
                  <EntrySelect
                    options={optionsSubCategory}
                    name="subCategory"
                  ></EntrySelect>
                </div>
                <div className="col-xl-12">
                  <h5 className="form-title">Address</h5>
                </div>
                <div className="form-group col-xl-12">
                  <label className="me-sm-2">City</label>
                  <EntrySelect
                    options={optionsLocation}
                    name="location"
                  ></EntrySelect>
                </div>
                <div className="form-group col-xl-12">
                  <label className="me-sm-2">Biography</label>
                  <EntryText
                    multiline
                    rows={10}
                    placeholder="Enter your biography"
                    name="bio"
                  ></EntryText>
                </div>

                <div className="form-group col-xl-12">
                  <button
                    disabled={isUploading}
                    className="btn btn-primary submit-btn"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProviderSettings;
