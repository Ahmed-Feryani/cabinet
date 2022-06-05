import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ServicesCollection } from "../../../api/services/services";
import Rating from "@mui/material/Rating";
import { useTracker } from "meteor/react-meteor-data";
import { ReviewsCollection } from "../../../api/reviews/reviews";
const Service = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const isProvider = useTracker(() => {
    return Meteor?.user()?.profile?.isProvider;
  });
  const isClient = useTracker(() => {
    return Meteor?.user()?.profile?.isClient;
  });

  const userName = useTracker(() => {
    return Meteor?.user()?.profile?.name;
  });

  const service = useTracker(() => {
    Meteor.subscribe("services");
    Meteor.subscribe("allUsers");
    const service = ServicesCollection.findOne(id);
    const seeker = Meteor.users.findOne(service.seeker);
    const provider = Meteor.users.findOne(service.provider);
    return {
      ...service,
      nameProvider: provider?.profile?.name,
      lastNameProvider: provider?.profile?.lastName,
      nameSeeker: seeker?.profile?.name,
      lastNameSeeker: seeker?.profile?.lastName,
    };
  });

  const review = useTracker(() => {
    Meteor.subscribe("reviews");
    return ReviewsCollection.findOne({ serviceId: service?._id });
  });
  useEffect(() => {
    if (review?.value) {
      setValue(review?.value);
    }
  });

  const user = useTracker(() => {
    return Meteor.user();
  });
  const finishedHandler = (id) => {
    Meteor.call("ServicesCollection.Finished.update", id, () => {
      Meteor.call(
        "notification.insert",
        `${userName} finished his work`,
        service?.seeker,
        service?._id
      );
    });
  };

  const reviewHandler = (event, newValue) => {
    console.log("new value :::::::::::::", newValue);
    Meteor.subscribe("reviews");
    const review = ReviewsCollection.findOne({
      serviceId: service?._id,
    });
    if (review) {
      Meteor.call("ReviewsCollection.update", review._id, newValue, () => {
        setValue(newValue);
      });
    } else {
      Meteor.call(
        "ReviewsCollection.insert",
        service._id,
        Meteor.userId(),
        service.provider,
        user.profile.name,
        user.profile.lastName,
        newValue,
        () => {
          setValue(newValue);
          Meteor.call(
            "notification.insert",
            `${userName} review your work`,
            service?.provider
          );
        }
      );
    }
  };

  return (
    <section
      style={{
        fontSize: "3rem",
      }}
    >
      <div>description : {service?.description} </div>

      <div>pro: {`${service?.nameProvider} ${service?.lastNameProvider}`}</div>
      <div>Client: {`${service?.nameSeeker} ${service?.lastNameSeeker}`} </div>
      <div>Created:</div>

      <div>Completed: date </div>
      <div>Num de telophone: {service?.phone_user} </div>
      <div>
        {" "}
        finished : {service?.isFinished ? "yes" : "no"}{" "}
        {isProvider && (
          <button onClick={() => finishedHandler(id)}>mark as finish</button>
        )}
        {isClient && (
          <Rating
            onChange={(event, newValue) =>
              reviewHandler(event, newValue, service.provider)
            }
            readOnly={!service?.isFinished}
            value={value}
          />
        )}
        {isProvider && <Rating readOnly value={value} />}
      </div>
    </section>
  );
};

export default Service;
