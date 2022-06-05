import React from "react";

import "./style.scss";

import AddPhotoTabs from "./AddPhotoTabs/AddPhotoTabs";

const AddPhotoClient = (props) => {
  return (
    <div className="AddPhotoClient">
      <AddPhotoTabs></AddPhotoTabs>
    </div>
  );
};

export default AddPhotoClient;
