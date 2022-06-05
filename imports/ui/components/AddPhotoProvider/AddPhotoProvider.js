import React from "react";

import "./style.scss";

import AddPhotoTabs from "./AddPhotoTabs/AddPhotoTabs";

const AddPhotoProvider = (props) => {
  return (
    <div className="AddPhotoProvider">
      <AddPhotoTabs></AddPhotoTabs>
    </div>
  );
};

export default AddPhotoProvider;
