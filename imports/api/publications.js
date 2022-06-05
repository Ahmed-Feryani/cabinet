import { Meteor } from "meteor/meteor";
Meteor.users.allow({
  update: function (userId, doc, fields, modifier) {

    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});
Meteor.publish("allUsers", function () {
  return Meteor.users.find({}, { fields: { emails: 1, profile: 1 } });
});
