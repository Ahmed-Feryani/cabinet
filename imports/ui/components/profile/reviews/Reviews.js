import "./review.css";
//import TimeAgo from "javascript-time-ago";
//import ReactTimeAgo from "react-time-ago";
//import fr from "javascript-time-ago/locale/fr.json";
import { Box, Rating } from "@mui/material";
import React from "react";
import { ReviewsCollection } from "../../../../api/reviews/reviews";
import { useTracker } from "meteor/react-meteor-data";
//TimeAgo.addDefaultLocale(fr);
import moment from "moment";
const labels = {
  Useless: 0.5,
  "Useless+": 1,
  Poor: 1.5,
  "Poor+": 2,
  Ok: 2.5,
  "Ok+": 3,
  Good: 3.5,
  "Good+": 4,
  Excellent: 4.5,
  "Excellent+": 5,
};
const Review = ({ id }) => {
  const reviewsList = useTracker(() => {
    Meteor.subscribe("myReviews", id);
    Meteor.subscribe("allUsers");

    const reviewsList = ReviewsCollection.find({ toId: id }).fetch();

    return reviewsList.map((review) => {
      const user = Meteor.users.findOne(review.userId);
      return {
        ...review,
        firstName: user?.profile?.name,
        lastName: user?.profile?.lastName,
      };
    });
  });
  return (
    <div className="container">
      <h2>Avis et commentaires</h2>

      {reviewsList?.map((review, ind) => (
        <div key={ind} className="review-list">
          <div className="gold-members p-4">
            <div className="media">
              <img className="mr-4" src="" alt="Generic placeholder" />

              <div className="media-body">
                <span className="float-right text-info">
                  {`${review.firstName} ${review.lastName}`}
                  <i className="icofont-check-circled text-success" />
                </span>

                {true && (
                  <p className="text-gray mb-1">
                    {" "}
                    {moment(review.date).fromNow()}
                    {/* <ReactTimeAgo date={repair.finished.date} /> */}
                  </p>
                )}
                <Box
                  sx={{
                    "& > legend": { md: 2 },
                  }}
                >
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={review.value}
                    readOnly
                    size="large"
                  />
                </Box>

                <hr />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
