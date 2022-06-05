import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { ReviewsCollection } from "../../../api/reviews/reviews";
import Rating from "@mui/material/Rating";
import "./style.scss";
import { Link } from "react-router-dom";

const ServiceWidget = ({
  profile: { name, location, professionalSpecialty, isProvider, avatar },
  user: { _id },
}) => {
  const reviewsScore = useTracker(() => {
    Meteor.subscribe("myReviews", _id);
    const reviewsList = ReviewsCollection.find({ toId: _id }).fetch();
    const score =
      reviewsList.reduce((acc, review) => review.value + acc, 0) /
      reviewsList.length;
    return [score, reviewsList.length];
  });
  return (
    <div className="service-widget">
      <div className="service-img">
        <img
          className="img-fluid serv-img service-widget__img"
          alt="Service Image"
          src={avatar?.url || "/profile.jpg"}
        />

        <div className="fav-btn">
          <div className="fav-icon">
            <i className="fas fa-heart"></i>
          </div>
        </div>
        <div className="item-info">
          <div className="cate-list">
            {professionalSpecialty && (
              <div className="bg-yellow" href="service-details.html">
                {professionalSpecialty}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="service-content">
        <h3 className="title">
          <div href="service-details.html"> {name} </div>
        </h3>
        {isProvider && (
          <div className="rating">
            {!!reviewsScore[1] ? (
              <>
                <Rating
                  name="read-only"
                  value={reviewsScore[0]}
                  readOnly
                  precision={0.5}
                />
                <span className="d-inline-block average-rating">
                  {`(${reviewsScore[0].toFixed(1)})`}
                </span>
              </>
            ) : (
              <div>Not been reviewed yet </div>
            )}
          </div>
        )}

        <div className="user-info">
          <div className="row">
            <span className="col-auto ser-contact">
              <i className="fas fa-phone me-1"></i>
              52349345
            </span>
            <span className="col ser-location">
              <span>{location} </span>
              <i className="fas fa-map-marker-alt ms-1"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceWidget;
