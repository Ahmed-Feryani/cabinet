import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./style.scss";
import ReviewCard from "../ReviewCard/ReviewCard";
import MapAddress from "../MapAddress/MapAddress";
import ServicesSlider from "../ServicesSlider/ServicesSlider";
import { useParams } from "react-router-dom";
import { ServicesCollection } from "../../../api/services/services";
import { ImagesCollection } from "../../../api/images/images";
import modal from "../../../libs/modal";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { ConsultationCollection } from "../../../api/consultations/consultation";

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

export default function DetailsTabs() {
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const user = useTracker(() => {
    return Meteor.users.findOne(id);
  });
  const consultations = useTracker(() => {
    Meteor.subscribe("consultation");
    return ConsultationCollection.find({ userId: id }).fetch();
  });
  const service = useTracker(() => {
    Meteor.subscribe("services");

    return ServicesCollection.findOne(id);
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="DetailsTabs">
      <div className="DetailsTabs__head">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="consultation" {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="card service-description">
            <div className="card-body">
              <h5 className="card-title">name</h5>
              <p className="mb-0">{user?.profile?.name}</p>
            </div>
          </div>
          <div className="card service-description">
            <div className="card-body">
              <h5 className="card-title">lastName</h5>
              <p className="mb-0">{user?.profile?.lastName}</p>
            </div>
          </div>
          <div className="card service-description">
            <div className="card-body">
              <h5 className="card-title">birth date</h5>
              <p className="mb-0">{user?.profile?.birth}</p>
            </div>
          </div>
          <div className="card service-description">
            <div className="card-body">
              <h5 className="card-title">phone number</h5>
              <p className="mb-0">{user?.profile?.phone}</p>
            </div>
          </div>
          <div className="card service-description">
            <div className="card-body">
              <h5 className="card-title">cin</h5>
              <p className="mb-0">{user?.profile?.cin}</p>
            </div>
          </div>
          <div className="card service-description">
            <div className="card-body">
              <h5 className="card-title">antecedent</h5>
              <p className="mb-0">{user?.profile?.description}</p>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {consultations?.map((consultation) => {
          return (
            <ReviewCard
              id={id}
              _id={consultation._id}
              consultation={consultation}
            ></ReviewCard>
          );
        })}
      </TabPanel>
    </Box>
  );
}
