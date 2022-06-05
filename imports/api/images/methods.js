import { Meteor } from "meteor/meteor";
import { ImagesCollection } from "./images";

Meteor.methods({
  "images.insert"(url, publicId, serviceId) {
    return ImagesCollection.insert({
      url,
      publicId,
      serviceId,
      user: Meteor.userId(),
    });
  },
  "images.update"(id, url, publicId, serviceId) {
    return ImagesCollection.update(id, {
      $set: {
        url,
        publicId,
        serviceId,
      },
    });
  },
});
