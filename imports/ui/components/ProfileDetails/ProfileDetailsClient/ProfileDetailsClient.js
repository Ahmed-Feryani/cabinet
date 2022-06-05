import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import DetailsTabs from "../../DetailsTabs/DetailsTabs";
import moment from "moment";
import cx from "classnames";
const ProfileDetailsClient = () => {
  const { id } = useParams();
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");

    return Meteor.users.findOne(id);
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="service-view">
            <div className="service-header">
              <div className="d-flex justify-content-between align-items-center">
                <h1>{user?.profile?.professionalSpecialty} </h1>
                <div className="fav-btn fav-btn-big">
                  <div className="fav-icon with-border">
                    <i className="fas fa-heart"></i>
                  </div>
                </div>
              </div>
              <address className="service-location">
                <i className="fas fa-location-arrow"></i>{" "}
                {user?.profile?.location}
              </address>
            </div>

            <div className="service-details">
              <DetailsTabs isProfile></DetailsTabs>
            </div>
          </div>
        </div>
        <div className="col-lg-4 theiaStickySidebar">
          <div className="card provider-widget clearfix">
            <div className="card-body">
              <h5 className="card-title">Client</h5>
              <div className="about-author">
                <div className="about-provider-img">
                  <div className="provider-img-wrap">
                    <a href="javascript:void(0);">
                      <img
                        className="img-fluid rounded-circle"
                        alt=""
                        src={user?.profile?.avatar?.url || "/profile.jpg"}
                      />
                    </a>
                  </div>
                </div>
                <div className="provider-details">
                  <div className="ser-provider-name">
                    {`${user?.profile?.name} ${user?.profile?.lastName}`}
                  </div>
                  <p className="last-seen">
                    <i
                      className={cx(
                        "fas fa-circle",
                        { online: user?.profile?.isOnline },
                        { offline: !user?.profile?.isOnline }
                      )}
                    ></i>{" "}
                    {user?.profile?.isOnline ? "Online" : "Offline"}
                  </p>
                  <p className="text-muted mb-1">
                    {`Member Since ${moment(user?.profile?.createdAt).format(
                      "MMMM YYYY"
                    )}`}
                  </p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsClient;
