import React, { useEffect, useState } from "react";
import "./style.scss";
import { Form, Formik } from "formik";

import * as Yup from "yup";

import { Button } from "@mui/material";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import EntryText from "../../../Entry/EntryText/EntryText";
import snackBar from "../../../../../libs/snackBar";
import modal from "../../../../../libs/modal";
import { useTranslation } from "react-i18next";
const INITIAL_STATE = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Enter valid password"),

  confirmPassword: Yup.string()
    .required("Enter valid password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUpClient = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(false);
  const handleClickShowPassword = () => {
    setshowPass(!showPass);
  };
  const handleSubmit = (values, resetForm) => {
    console.log(values);
    Accounts.createUser(
      { email: values.email, password: values.password },
      (err) => {
        if (err) {
          snackBar.set("snackbar", {
            open: true,
            msg: err.reason,
            severity: "error",
          });
        } else {
          Meteor.users.update(
            { _id: Meteor.user()._id },
            {
              $set: {
                profile: {     
                  name: values.name,
                  lastName: values.lastName,  
                  isPatient: true,
                  isAdmin: false,
                  isSecretary: false,
                  createdAt: Date.now(),
                  fullName: `${values.name} ${values.lastName}`,
                  isOnline: true,
                },
              },
            },
            (err) => {
              if (err) {
              } else {
                snackBar.set("snackbar", {
                  open: true,
                  msg: `hello ${Meteor.user()?.profile?.name}`,
                  severity: "success",
                });
                modal.set("modalSignUp", {
                  open: false,
                });
                resetForm();
              }
            }
          );
        }
      }
    );
  };

  useEffect(() => {
    if (Meteor.userId()) {
      navigate("/", { replace: true });
    }
  }, [Meteor.userId()]);

  return (
    <div className="sign-up-form">
      <Formik
        initialValues={{ ...INITIAL_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ isValid, dirty }) => {
          return (
            <Form>
              <div className="form-group form-focus">
                <label className="focus-label">{t("Name")}</label>
                <EntryText name="name" placeholder={t("enterName")}></EntryText>
              </div>
              <div className="form-group form-focus">
                <label className="focus-label">{t("LastName")}</label>
                <EntryText
                  name="lastName"
                  placeholder={t("enterLastName")}
                ></EntryText>
              </div>
              <div className="form-group form-focus">
                <label className="focus-label">Email</label>
                <EntryText
                  name="email"
                  placeholder={t("EnterEmailAddress")}
                ></EntryText>
              </div>
              <div className="form-group form-focus">
                <label className="focus-label">{t("Password")}</label>
                <EntryText
                  name="password"
                  placeholder={t("EnterPassword")}
                  type={showPass ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPass ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></EntryText>
              </div>
              <div className="form-group form-focus">
                <label className="focus-label">{t("Password")}</label>
                <EntryText
                  name="confirmPassword"
                  placeholder={t("confirmPassword")}
                  type={showPass ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPass ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></EntryText>
              </div>
              <div className="text-end">
                <span
                  onClick={() => {
                    modal.set("modalSignUp", {
                      open: false,
                    });
                    modal.set("modalLogIn", {
                      open: true,
                    });
                  }}
                  className="forgot-link"
                >
                  {t("haveAccount")}
                </span>
              </div>

              <div className="d-grid">
                <button
                  disabled={!(isValid && dirty)}
                  className="btn btn-primary btn-block btn-lg login-btn"
                  type="submit"
                >
                  {t("SignUp")}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUpClient;
