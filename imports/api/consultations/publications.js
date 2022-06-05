import { Meteor } from "meteor/meteor";
import { ConsultationCollection } from "./consultation";

Meteor.publish("consultation", function () {
  return ConsultationCollection.find();
});
