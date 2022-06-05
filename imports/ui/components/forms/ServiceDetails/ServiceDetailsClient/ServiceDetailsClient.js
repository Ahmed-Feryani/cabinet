import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import DetailsTabs from "../../../DetailsTabs/DetailsTabs";
import { ServicesCollection } from "../../../../../api/services/services";
import ServiceProcessModal from "../../../Modal/ServiceProcessModal/ServiceProcessModal";
import "./style.scss";
import modal from "../../../../../libs/modal";
import ReviewModal from "../../../Modal/ReviewModal/ReviewModal";
import { ReviewsCollection } from "../../../../../api/reviews/reviews";
import moment from "moment";
import cx from "classnames";
import ServicesSlider from "../../../ServicesSlider/ServicesSlider";
import ModalAddPhoto from "../../../Modal/ModalAddPhoto/ModalAddPhoto";
import AddPhotoClient from "../../../AddPhotoClient/AddPhotoClient";
const btnRender = (id, service, action) => {
  if (service?.isPending) {
    return (
      <button disabled className="btn btn-primary">
        Pending
      </button>
    );
  }
  if (service?.isInProgress) {
    return (
      <button disabled className="btn btn-primary">
        In progress
      </button>
    );
  }
  if (service?.isRejectedProvider) {
    return (
      <button disabled className="btn btn-danger">
        Provider rejected the work
      </button>
    );
  }
  if (service?.isFinished) {
    return (
      <div className="opinion-box">
        <div className="opinion-box__btn">
          <button
            onClick={() => {
              action({
                text: "Are you sure you Accepted the work ?",
                handler: () =>
                  Meteor.call("ServicesCollection.accepted.update", id, () => {
                    Meteor.call(
                      "notification.insert",
                      `approved the work`,
                      service.provider,
                      id
                    );
                  }),
              });
              modal.set("modalServiceProcess", {
                open: true,
              });
            }}
            className="btn btn-primary"
          >
            Accept Finished Service
          </button>
        </div>
        <div className="opinion-box__btn">
          <button
            onClick={() => {
              action({
                text: "Are you sure you will Decline the work ?",
                handler: () =>
                  Meteor.call("ServicesCollection.rejected.update", id, () => {
                    Meteor.call(
                      "notification.insert",
                      `declined the work`,
                      service.provider,
                      id
                    );
                  }),
              });
              modal.set("modalServiceProcess", {
                open: true,
              });
            }}
            className="btn btn-danger"
          >
            Decline Finished Service
          </button>
        </div>
      </div>
    );
  }
  if (service?.isAccepted) {
    return (
      <>
        <button disabled className="btn btn-primary">
          Service is Finished
        </button>
        <button
          onClick={() => {
            modal.set("modalReview", {
              open: true,
            });
          }}
          className="btn btn-primary btn--review"
        >
          Review the service
        </button>
      </>
    );
  }
  if (service?.isRejected) {
    return (
      <>
        <button disabled className="btn btn-primary">
          You rejected the service
        </button>
        <button
          onClick={() => {
            modal.set("modalReview", {
              open: true,
            });
          }}
          className="btn btn-primary btn--review"
        >
          Review the service
        </button>
      </>
    );
  }
};

const ServiceDetailsClient = () => {
  const { id } = useParams();
  const [modalProcess, setmodalProcess] = useState({ text: "", handler: null });
  const service = useTracker(() => {
    Meteor.subscribe("services");
    return ServicesCollection.findOne(id);
  });
  const provider = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(service?.provider);
  });
  const reviews = useTracker(() => {
    Meteor.subscribe("reviews");
    return ReviewsCollection.find({ serviceId: id }).fetch();
  });

  return (
    <div className="content ServiceDetailsClient">
      <ServiceProcessModal
        msg={modalProcess.text}
        handler={modalProcess.handler}
      ></ServiceProcessModal>
      <ModalAddPhoto>
        <AddPhotoClient></AddPhotoClient>
      </ModalAddPhoto>
      <ReviewModal id={id}></ReviewModal>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="service-view">
              <div className="service-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h1> {service?.title} </h1>

                  <button
                    className="btn btn-primary btn--add-photo"
                    onClick={() => {
                      modal.set("modalAddPhoto", {
                        open: true,
                      });
                    }}
                  >
                    Add Photos
                  </button>
                </div>

                <address className="service-location">
                  <i className="fas fa-location-arrow"></i>
                  {service?.location}
                </address>
                <div className="service-cate">
                  <Link to="/"> {service?.category} </Link>
                </div>
              </div>

              <div className="service-details">
                <DetailsTabs
                  address={service?.address}
                  title="Description"
                  para={service?.description}
                  reviews={reviews}
                  isClient
                ></DetailsTabs>
              </div>
            </div>
          </div>
          <div className="col-lg-4 theiaStickySidebar">
            <div className="sidebar-widget widget">
              <div className="service-amount">
                <span></span>
              </div>
              <div className="service-book">
                {btnRender(id, service, setmodalProcess)}
              </div>
            </div>
            <div className="card provider-widget clearfix">
              <div className="card-body">
                <h5 className="card-title">Service provider</h5>
                <div className="about-author">
                  <div className="about-provider-img">
                    <div className="provider-img-wrap">
                      <img
                        className="img-fluid rounded-circle"
                        alt=""
                        src={provider?.profile?.avatar?.url || "/profile.jpg"}
                      />
                    </div>
                  </div>
                  <div className="provider-details">
                    <Link
                      to={`/profile/${provider?._id}`}
                      className="ser-provider-name"
                    >
                      {`${provider?.profile?.name} ${provider?.profile?.lastName}`}
                    </Link>
                    <p className="last-seen">
                      <i
                        className={cx(
                          "fas fa-circle",
                          { online: provider?.profile?.isOnline },
                          { offline: !provider?.profile?.isOnline }
                        )}
                      ></i>{" "}
                      {provider?.profile?.isOnline ? "Online" : "Offline"}
                    </p>
                    <p className="text-muted mb-1">
                      {`Member Since ${moment(
                        provider?.profile?.createdAt
                      ).format("MMMM YYYY")}`}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsClient;
