import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import AddPhotoBefore from "../AddPhotoBefore/AddPhotoBefore";
import "./style.scss";
import AddPhotoAfter from "../AddPhotoAfter/AddPhotoAfter";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AddPhotoTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="AddPhotoTabs">
      <div className="AddPhotoTabs__head">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Before" {...a11yProps(0)} />
          <Tab label="After" {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <div className="AddPhotoTabs__panel">
          <AddPhotoBefore></AddPhotoBefore>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="AddPhotoTabs__panel">
          <AddPhotoAfter></AddPhotoAfter>
        </div>
      </TabPanel>
    </Box>
  );
}
