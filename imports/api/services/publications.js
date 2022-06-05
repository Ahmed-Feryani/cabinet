import { Meteor } from "meteor/meteor";
import { ServicesCollection } from "./services";

Meteor.publish("services", function () {
  return ServicesCollection.find();
});


