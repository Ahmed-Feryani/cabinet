import { Meteor } from "meteor/meteor";
import { RdvCollection } from "./rdv";

Meteor.publish("rdv", () => {
  return RdvCollection.find();
});
