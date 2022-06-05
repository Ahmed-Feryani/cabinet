import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { ReviewsCollection } from "../../../api/reviews/reviews";
import Rating from "@mui/material/Rating";

const ServiceCard = (props) => {
  
  return (
    <div class="service-widget">
      <div class="service-img">
        <a href="service-details.html">
          <img
            class="img-fluid serv-img"
            alt="Service Image"
            src="assets/img/services/service-01.jpg"
          />
        </a>
        <div class="fav-btn">
          <a href="javascript:void(0)" class="fav-icon">
            <i class="fas fa-heart"></i>
          </a>
        </div>
        <div class="item-info">
          <div class="service-user">
            <a href="#">
              <img src="assets/img/customer/user-01.jpg" alt="" />
            </a>
            <span class="service-price">$25</span>
          </div>
          <div class="cate-list">
            {professionalSpecialty && (
              <div class="bg-yellow" href="service-details.html">
                {professionalSpecialty}
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="service-content">
        <h3 class="title">
          <div href="service-details.html"> {name} </div>
        </h3>
        {isProvider && (
          <div class="rating">
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

        <div class="user-info">
          <div class="row">
            <span class="col-auto ser-contact">
              <i class="fas fa-phone me-1"></i>
              <span>xxxxxxxx49</span>
            </span>
            <span class="col ser-location">
              <span>{location} </span>
              <i class="fas fa-map-marker-alt ms-1"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
