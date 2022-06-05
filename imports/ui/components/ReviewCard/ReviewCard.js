import React from "react";
import { Rating } from "@mui/material";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const ReviewCard = (props) => {
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor?.users?.findOne(props.id);
  });
  return (
    <div className="card review-box">
      <div className="card-body">
        <div className="review-list">
          <div className="review-info">
            <h5>{`${user?.profile?.name} ${user?.profile?.lastName}`}</h5>
            <div className="review-date">
              {moment(props?.consultation?.createdAt).format(
                "MM DD, YYYY hh:mm"
              )}
            </div>
            <p className="mb-0"> {props?.consultation?.objective} </p>
          </div>
          <div className="review-count">
            <div className="rating ch">
              <Link to={`/consultation/${props._id}`}>
                <Button variant="outlined">Consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
