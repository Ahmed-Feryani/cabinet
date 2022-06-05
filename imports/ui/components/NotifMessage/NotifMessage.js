import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import moment from "moment";
import { useTracker } from "meteor/react-meteor-data";
import "./style.scss";

const NotifMessage = ({
  notif: { name, lastName, subject, createdAt, _id, seen, sender },
  to,
  setnotifDrop,
}) => {
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor?.users?.findOne(sender);
  });
  return (
    <li
      onClick={() => {
        setnotifDrop(false);
        Meteor.call("notification.seen.update", _id);
      }}
      className="notification-message notification-msg"
    >
      <Link to={to}>
        <div className="media d-flex">
          <span className="avatar avatar-sm flex-shrink-0">
            <img
              className="avatar-img rounded-circle"
              alt="User Image"
              src={user?.profile?.avatar?.url || "/profile.jpg"}
            />
          </span>
          <div className="media-body flex-grow-1 notification-msg__body">
            <div>
              <p className="noti-details">
                <span className="noti-title">
                  {`${name} ${lastName} ${subject}`}
                </span>
              </p>
              <p className="noti-time">
                <span className="notification-time">
                  {moment(createdAt).fromNow()}
                </span>
              </p>
            </div>

            <p className="last-seen notification-msg__dot">
              <i
                className={cx(
                  "fas fa-circle",
                  { online: seen },
                  { offline: !seen }
                )}
              ></i>
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default NotifMessage;
