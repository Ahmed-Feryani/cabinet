import React from "react";
import BookingWidget from "../../BookingWidget/BookingWidget";
import { useTracker } from "meteor/react-meteor-data";
import { ServicesCollection } from "../../../../api/services/services";
import "./style.scss";
const Services = () => {
  const services = useTracker(() => {
    Meteor.subscribe("services");
    return ServicesCollection.find({ seeker: Meteor.userId() }).fetch();
  });
  return (
    <div className="content dashboard-services">
      <div className="dashboard-services__box">
        <div className="dashboard-services__head">
          <div>
            <h4 className="widget-title mb-0">My Bookings</h4>
          </div>
          <div>
            <div className="sort-by">
              <select className="form-control-sm custom-select">
                <option>All</option>
                <option>Pending</option>
                <option>Inprogress</option>
                <option>Complete Request</option>
                <option>Rejected</option>
                <option>Cancelled</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {services?.map((service) => {
            return (
              <BookingWidget
                key={service._id}
                service={service}
              ></BookingWidget>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
