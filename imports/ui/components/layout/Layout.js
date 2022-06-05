import React from "react";
import Footer from "../Footer/Footer";
// import Footer from "../footer/Footer";
import Header from "../Header/Header";
//import Navbar from "../navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
const Layout = (props) => {
  return (
    <div className="layout">
      <Header></Header>
      <div className="layout__body">{props.children}</div>
    </div>
  );
};

export default Layout;
