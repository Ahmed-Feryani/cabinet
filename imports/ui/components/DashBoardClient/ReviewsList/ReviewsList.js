import React from "react";
import { ReviewsCollection } from "../../../../api/reviews/reviews";
import ReviewCard from "../../ReviewCard/ReviewCard";
import { useTracker } from "meteor/react-meteor-data";

const ReviewsList = () => {
  const reviews = useTracker(() => {
    Meteor.subscribe("myReviewsClient", Meteor.userId());
    return ReviewsCollection.find({ userId: Meteor.userId() }).fetch();
  });
  return (
    <div>
      <div>
        <h4 className="widget-title mb-0">Reviews</h4>
      </div>
      <div className="content">
        {reviews?.map((review) => {
          return <ReviewCard key={review._id} review={review}></ReviewCard>;
        })}
      </div>
    </div>
  );
};

export default ReviewsList;
