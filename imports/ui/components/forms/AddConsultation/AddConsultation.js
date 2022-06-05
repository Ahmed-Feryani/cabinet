import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import EntryText from "../../Entry/EntryText/EntryText";
import EntrySelect from "../../Entry/EntrySelect/EntrySelect";
//import { optionsCategory, optionsSubCategory } from "./options";
import MapAddress from "../../MapAddress/MapAddress";
//import "./style.scss";
import mapCoordination from "../../../../libs/mapCoordination";
import snackBar from "../../../../libs/snackBar";
const FORM_VALIDATION = Yup.object().shape({
  objective: Yup.string().required(),
  dent_num: Yup.string().required(),
  act: Yup.string().required(),
  next_consultation_date: Yup.string().required(),
  next_consultation_time: Yup.string().required(),
  price: Yup.string().required(),
  remark: Yup.string().required(),
  patient_name: Yup.string(),
  patient_lastName: Yup.string(),
  medicament_name: Yup.string(),
  medicament_usage: Yup.string(),
});

const AddConsultation = () => {
  const { id, userId } = useParams();
  const navigate = useNavigate();
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(userId);
  });

  const INITIAL_STATE = {
    objective: "",
    dent_num: "",
    act: "",
    next_consultation_date: "",
    next_consultation_time: "",
    price: "",
    remark: "",
    patient_name: user?.profile?.name || "",
    patient_lastName: user?.profile?.lastName || "",
    medicament_name: "",
    medicament_usage: "",
  };

  const onSubmitHandler = (values, resetForm) => {
    console.log(userId);
    //Meteor.call("consultation.insert")
    Meteor.call(
      "consultation.insert",
      userId,
      values.objective,
      values.dent_num,
      values.act,
      new Date(
        values.next_consultation_date + "T" + values.next_consultation_time
      ),
      values.remark,
      values.price,
      values.patient_name,
      values.patient_lastName,
      values.medicament_name,
      values.medicament_usage
    );
    navigate("/");
  };

  return (
    <div className="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-header text-center">
              <h2>Add Consultation</h2>
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
                      <h3 className="heading-2">Information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Objective
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="objective"
                              placeholder="Enter objective"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              tooth number
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              type="number"
                              name="dent_num"
                              placeholder="Enter tooth number"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Act
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="act"
                              placeholder="Enter act"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Price
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="price"
                              placeholder="Enter price"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Next consultation date
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              type="date"
                              name="next_consultation_date"
                              placeholder="Enter next consultation"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Next consultation time
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              type="time"
                              name="next_consultation_time"
                              placeholder="Enter next consultation"
                            ></EntryText>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="service-fields mb-3">
                      <h3 className="heading-2">ordonnance</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              patient name
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="patient_name"
                              placeholder="Enter patient name"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              patient lastName
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="patient_lastName"
                              placeholder="Enter patient lastName"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              medicament name
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="medicament_name"
                              placeholder="Enter patient medicament name"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              medicament usage
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="medicament_usage"
                              placeholder="Enter medicament usage"
                            ></EntryText>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="service-fields mb-3">
                      <h3 className="heading-2">remark</h3>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>
                              remarks
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="remark"
                              placeholder="Enter your remark"
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

export default AddConsultation;
