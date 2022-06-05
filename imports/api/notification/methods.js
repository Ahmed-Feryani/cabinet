import { Meteor } from "meteor/meteor";
import { Notification } from "./notification";

Meteor.methods({
  "notification.insert"(subject, recId, serviceId) {
    Notification.insert({
      sender: this.userId,
      recId,
      subject,
      serviceId,
      seen: false,
      createdAt: Date.now(),
    });
  },
  "notification.seen.update"(id) {
    Notification.update(id, { $set: { seen: true } });
  },
  "notification.remove"(id) {
    Notification.remove(id);
  },
  "notification.removeAll"(id) {
    Notification.remove({ recId: id });
  },
});
