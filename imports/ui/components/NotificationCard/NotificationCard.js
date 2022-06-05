import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useTracker } from "meteor/react-meteor-data";
const NotificationCard = ({
  notif: { name, lastName, subject, createdAt, _id, sender },
  to,
}) => {
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor?.users?.findOne(sender);
  });
  return (
    <Link to={to} className="notificationlist">
      <div className="inner-content-blk position-relative">
        <div className="d-flex text-dark">
          <img
            className="rounded"
            src={user?.profile?.avatar?.url || "/profile.jpg"}
            width="50"
            alt=""
          />
          <div className="noti-contents">
            <h3>
              <strong>{`${name} ${lastName} ${subject}`}</strong>
            </h3>
            <span>{moment(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
