import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import DetailsTabs from "../../DetailsTabs/DetailsTabs";
import modal from "../../../../libs/modal";
import Rating from "@mui/material/Rating";
import { ReviewsCollection } from "../../../../api/reviews/reviews";
import cx from "classnames";
import moment from "moment";
import Button from "@mui/material/Button";
const ProfileDetailsProvider = () => {
  const { id } = useParams();
  const isSecretary = useTracker(() => {
    return Meteor?.user()?.profile?.isSecretary;
  });

  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(id);
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="service-details">
            <DetailsTabs id={id}></DetailsTabs>
          </div>
        </div>
        <div className="col-lg-4 theiaStickySidebar">
          {isSecretary && (
            <div className="sidebar-widget widget">
              <div className="service-amount">
                <span></span>
              </div>
              <div className="service-book">
                {user?.profile?.isVerified ? (
                  <Link to={`/add_service/${id}`} className="btn btn-primary">
                    Edit Patient File
                  </Link>
                ) : (
                  <Link to={`/add_service/${id}`} className="btn btn-primary">
                    Add Patient File
                  </Link>
                )}
                <Link to={`/ask-rdv/${id}`}>
                  <Button className="fixRdv-btn" variant="outlined">
                    Fix rdv
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="card provider-widget clearfix">
            <div className="card-body">
              <h5 className="card-title">Patient</h5>
              <div className="about-author">
                <div className="about-provider-img">
                  <div className="provider-img-wrap">
                    <div>
                      <img
                        className="img-fluid rounded-circle"
                        alt=""
                        src={user?.profile?.avatar?.url || "/profile.jpg"}
                      />
                    </div>
                  </div>
                </div>
                <div className="provider-details">
                  <div className="ser-provider-name">
                    {`${user?.profile?.name} ${user?.profile?.lastName}`}
                  </div>

                  <p className="text-muted mb-1">{`Member Since ${moment(
                    user?.profile?.createdAt
                  ).format("MMMM YYYY")}`}</p>
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

export default ProfileDetailsProvider;
