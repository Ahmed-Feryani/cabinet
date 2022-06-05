import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import EntryText from "../../Entry/EntryText/EntryText";
import EntrySelect from "../../Entry/EntrySelect/EntrySelect";
import { optionsCategory, optionsSubCategory } from "./options";
import MapAddress from "../../MapAddress/MapAddress";
import "./style.scss";
import mapCoordination from "../../../../libs/mapCoordination";
import snackBar from "../../../../libs/snackBar";
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(),
  lastName: Yup.string().required(),
  birth: Yup.string().required(),
  description: Yup.string().required(),
  phone: Yup.string().required(),
  cin: Yup.string().required(),
});

const AddServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(id);
  });
  const INITIAL_STATE = {
    name: user?.profile?.name || "",
    lastName: user?.profile?.lastName || "",
    birth: user?.profile?.birth || "",
    description: user?.profile?.description || "",
    phone: user?.profile?.phone || "",
    cin: user?.profile?.cin || "",
  };

  const onSubmitHandler = (values, resetForm) => {
    Meteor.users.update(
      { _id: id },
      {
        $set: {
          "profile.name": values.name,
          "profile.lastName": values.lastName,
          "profile.birth": values.birth,
          "profile.description": values.description,
          "profile.phone": values.phone,
          "profile.cin": values.cin,
          "profile.isVerified": true,
          "profile.fullName": `${values.name} ${values.lastName}`,
        },
      }
    );
    navigate(`/profile/${id}`);
    // Meteor.call(
    //   "ServicesCollection.insert",
    //   values.title,
    //   values.location,
    //   values.category,
    //   values.subCategory,
    //   values.description,
    //   values.phone,
    //   id,
    //   Meteor.userId(),
    //   coordination.lat,
    //   coordination.long,
    //   (err, serviceId) => {
    //     if (err) {
    //     } else {
    //       resetForm();
    //       Meteor.call(
    //         "notification.insert",
    //         `has booked a service`,
    //         id,
    //         serviceId
    //       );
    //       navigate(`/service/${serviceId}`, { replace: true });
    //       mapCoordination.set("coordination", {
    //         lat: null,
    //         long: null,
    //       });
    //     }
    //   }
    // );
  };

  return (
    <div className="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-header text-center">
              <h2>Add Patient File</h2>
            </div>
            <Formik
              enableReinitialize
              initialValues={{ ...INITIAL_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, { resetForm }) =>
                onSubmitHandler(values, resetForm)
              }
            >
              {({ isValid, dirty }) => {
                return (
                  <Form>
                    <div className="service-fields mb-3">
                      <h3 className="heading-2">Patient Information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Patient Name
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="name"
                              placeholder="Enter Patient Name"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Service Location
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="lastName"
                              placeholder="Enter Patient LastName"
                            ></EntryText>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Phone Number
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="phone"
                              placeholder="Enter your phone number"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Date of birth
                              <span className="text-danger">*</span>
                            </label>

                            <EntryText type="date" name="birth"></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              CIN
                              <span className="text-danger">*</span>
                            </label>

                            <EntryText name="cin"></EntryText>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="service-fields mb-3">
                      <h3 className="heading-2">Details Information</h3>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>
                              Antecedent
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="description"
                              placeholder="Enter your description"
                              multiline
                              rows={8}
                            ></EntryText>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="submit-section">
                      <button
                        className="btn btn-primary submit-btn"
                        type="submit"
                        disabled={!(isValid && dirty)}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;
