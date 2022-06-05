import React from "react";

import Featured from "./featured/Featured";
import Widget from "./widget/Widget";
import "./dash.scss";
const Dash = () => {
  return (
    <div>
      <div className="widgets">
        <Widget type="booking" />
        <Widget type="services" />
      </div>
      <div className="charts">
        <Featured />
      </div>
    </div>
  );
};

export default Dash;
