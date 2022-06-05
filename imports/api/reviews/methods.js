import { Meteor } from "meteor/meteor";
import { ReviewsCollection } from "./reviews";

Meteor.methods({
  "ReviewsCollection.insert"(serviceId, userId, toId, value, text) {
    ReviewsCollection.insert({
      serviceId,
      userId,
      toId,
      text: "",
      value,
      text,
      date: Date.now(),
    });
  },
  "ReviewsCollection.update"(id, value) {
    ReviewsCollection.update(id, { $set: { value } });
  },
});
