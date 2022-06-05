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
  date: Yup.string().required(),
  time: Yup.string().required(),
});

const FixRdvSecretary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const INITIAL_STATE = {
    date: "",
    time: "",
  };

  const onSubmitHandler = (values, resetForm) => {
    Meteor.call(
      "rdv.update.approve",
      id,
      new Date(values.date + "T" + values.time)
    );
    navigate("/");
  };

  return (
    <div className="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-header text-center">
              <h2>Fix rdv</h2>
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
                      <h3 className="heading-2">Date Information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Date
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              type="date"
                              name="date"
                              placeholder="Enter Date"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Time
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              type="time"
                              name="time"
                              placeholder="Enter Time"
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
                        Fix rdv
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

export default FixRdvSecretary;
