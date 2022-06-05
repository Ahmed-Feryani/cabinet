import React, { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./style.scss";
import { useTracker } from "meteor/react-meteor-data";
import ProviderSettings from "../ProviderSettings/ProviderSettings";
import { Link, useNavigate, useParams } from "react-router-dom";
import ServicesProvider from "../ServicesProvider/ServicesProvider";
import Services from "./Services/Services";

import ReviewsList from "./ReviewsList/ReviewsList";
import ClientSettings from "../ClientSettings/ClientSettings";

const IconRender = (props) => {
  return (
    <div className="dashboard__icon">
      <i className={`fas ${props.icon}`}></i>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const routes = ["settings", "services"];

export default function DashboardClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(routes.indexOf(id));

  const user = useTracker(() => {
    return Meteor.user();
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/dashboard/${routes[newValue]}`);
  };

  React.useEffect(() => {
    setValue(routes.indexOf(id));
  }, [id]);

  return (
    <div className="content">
      <Box
        className="dashboard container"
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <div className="dashboard__head">
          <div className="mb-4">
            <div className="d-sm-flex flex-row flex-wrap text-center text-sm-start align-items-center">
              <img
                alt="profile image"
                src={user?.profile?.avatar?.url || "/profile.jpg"}
                className="avatar-lg rounded-circle"
              />
              <div className="ms-sm-3 ms-md-0 ms-lg-3 mt-2 mt-sm-0 mt-md-2 mt-lg-0">
                <h6 className="mb-0"> {user?.profile?.fullName} </h6>
                <p className="text-muted mb-0">Member Since Apr 2020</p>
              </div>
            </div>
          </div>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              disableRipple
              icon={<IconRender icon="fa-user" />}
              iconPosition="start"
              label="Profile Settings"
              {...a11yProps(0)}
            />
            <Tab
              disableRipple
              icon={<IconRender icon="fa-address-book" />}
              iconPosition="start"
              label="My bookings"
              {...a11yProps(1)}
            />
          </Tabs>
        </div>
        <TabPanel className="dashboard__tab-panel" value={value} index={0}>
          <ClientSettings></ClientSettings>
        </TabPanel>
        <TabPanel className="dashboard__tab-panel" value={value} index={1}>
          <Services></Services>
        </TabPanel>
      </Box>
    </div>
  );
}
