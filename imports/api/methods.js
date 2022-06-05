import { Meteor } from "meteor/meteor";

Meteor.methods({
  "profileClient.update"(name, lastName, birth, location, tel) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      {
        $set: {
          "profile.name": name,
          "profile.lastName": lastName,
          "profile.location": location,
          "profile.birth": birth,
          "profile.tel": tel,
        },
      }
    );
  },
  "profile.update"(bio, birth, location, category, subCategory, tel) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      {
        $set: {
          "profile.bio": bio,
          "profile.birth": birth,
          "profile.location": location,
          "profile.professionalSpecialty": category,
          "profile.subCategory": subCategory,
          "profile.tel": tel,
        },
      }
    );
  },
  "profileAvatar.update"(url, publicId) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      {
        $set: {
          "profile.avatar": {
            url,
            publicId,
          },
        },
      }
    );
  },
});
