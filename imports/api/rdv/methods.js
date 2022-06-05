import { Meteor } from "meteor/meteor";
import { RdvCollection } from "./rdv";

Meteor.methods({
  "rdv.insert"(date, description, userId) {
    const patient = Meteor.users.findOne(userId);
    RdvCollection.insert({
      date,
      createdAt: new Date(),
      isApproved: false,
      description,
      userId,
      isCanceled: false,
      fullName: `${patient?.profile?.name} ${patient?.profile?.lastName}`,
    });
  },
  "rdv.update.approve"(id, date) {
    RdvCollection.update(id, {
      $set: {
        date,
        isApproved: true,
      },
    });
  },
  "rdv.update.cancel"(id) {
    RdvCollection.update(id, {
      $set: {
        isCanceled: true,
      },
    });
  },
});
