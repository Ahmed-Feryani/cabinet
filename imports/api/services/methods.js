import { Meteor } from "meteor/meteor";
import { ServicesCollection } from "./services";

Meteor.methods({
  "ServicesCollection.insert"(
    title,
    location,
    category,
    subCategory,
    description,
    phone,
    provider,
    seeker,
    lat,
    long
  ) {
    return ServicesCollection.insert({
      title,
      location,
      category,
      subCategory,
      description,
      phone,
      provider,
      seeker,
      isRejectedProvider: false,
      isPending: true,
      isInProgress: false,
      isFinished: false,
      isAccepted: false,
      isRejected: false,
      createdAt: Date.now(),
      finishedAt: "",
      address: {
        lat,
        long,
      },
    });
  },
  "ServicesCollection.imgProviderBefore.update"(id , imgId) {
    ServicesCollection.update(id, {
      $set: { "galleryProvider.before" : imgId },
    });
  },
  "ServicesCollection.imgProviderAfter.update"(id , imgId) {
    ServicesCollection.update(id, {
      $set: { "galleryProvider.after" : imgId },
    });
  },
  "ServicesCollection.imgClientBefore.update"(id , imgId) {
    ServicesCollection.update(id, {
      $set: { "galleryClient.before" : imgId },
    });
  },
  "ServicesCollection.imgClientAfter.update"(id , imgId) {
    ServicesCollection.update(id, {
      $set: { "galleryClient.after" : imgId },
    });
  },
  "ServicesCollection.providerDecline.update"(id) {
    ServicesCollection.update(id, {
      $set: { isPending: false, isRejectedProvider: true },
    });
  },
  "ServicesCollection.progress.update"(id) {
    ServicesCollection.update(id, {
      $set: { isPending: false, isInProgress: true },
    });
  },
  "ServicesCollection.finished.update"(id) {
    ServicesCollection.update(id, {
      $set: { isFinished: true, isInProgress: false },
    });
  },
  "ServicesCollection.rejected.update"(id) {
    ServicesCollection.update(id, {
      $set: { isRejected: true, isFinished: false },
    });
  },
  "ServicesCollection.accepted.update"(id) {
    ServicesCollection.update(id, {
      $set: { isAccepted: true, isFinished: false },
    });
  },
});
