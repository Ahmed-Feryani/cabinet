import { Meteor } from "meteor/meteor";
import { ImagesCollection } from "./images";

Meteor.publish("images", function () {
  return ImagesCollection.find();
});
