import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
const Login = (props) => {
  const navigate = useNavigate();
  const [error, seterror] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        seterror(err.reason);
      } else {
        seterror("");
      }
    });
  };
  useEffect(() => {
    if (props.ok) {
      navigate("/", { replace: true });
    }
  }, [props.ok]);
  return (
    <div>
      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google">
              <img src="/login/img/google.png" alt="" className="icon" />
              Google
            </div>
            <div className="loginButton facebook">
              <img src="/login/img/facebook.png" alt="" className="icon" />
              Facebook
            </div>
            <div className="loginButton github">
              <img src="/login/img/github.png" alt="" className="icon" />
              Github
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <form onSubmit={submitHandler}>
              <input
                type="email"
                placeholder="Email"
                className="loginInput"
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                name="password"
              />
              <button className="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
