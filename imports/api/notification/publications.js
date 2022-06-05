import { Notification } from "./notification";
import { Meteor } from "meteor/meteor";

Meteor.publish("notification", function () {
  return Notification.find({ recId: this.userId });
});
