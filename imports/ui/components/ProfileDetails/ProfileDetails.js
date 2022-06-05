import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import ProfileDetailsProvider from "./ProfileDetailsProvider/ProfileDetailsProvider";
import ProfileDetailsClient from "./ProfileDetailsClient/ProfileDetailsClient";
const ProfileDetails = () => {
  const { id } = useParams();
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(id);
  });
  return (
    <div className="content">
      <ProfileDetailsProvider></ProfileDetailsProvider>
    </div>
  );
};

export default ProfileDetails;
