import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import "./style.scss";
const EntryDate = ({ name, errMsg, ...otherProps }) => {
  const [field, meta] = useField(name);
  const config = {
    fullWidth: true,
    variant: "outlined",
    ...field,
    ...otherProps,
    InputLabelProps: {
      shrink: true,
    },
  };
  // ...
  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return (
    <div className="entry">
      <TextField {...config} />
    </div>
  );
};

export default EntryDate;
