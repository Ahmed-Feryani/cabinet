import React from "react";
import { ServicesCollection } from "../../../api/services/services";
import BookingWidget from "../BookingWidget/BookingWidget";
import { useTracker } from "meteor/react-meteor-data";

const Bookings = () => {
  const services = useTracker(() => {
    Meteor.subscribe("services");
    return ServicesCollection.find({ seeker: Meteor.userId() }).fetch();
  });
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h4 className="widget-title mb-0">My Bookings here</h4>
          </div>
          <div className="col-auto">
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
              <div className="col-lg-6  col-md-12" key={service._id}>
                <BookingWidget service={service}></BookingWidget>
              </div>
            );
          })}
        </div>

        {/* <div className="pagination">
          <ul>
            <li className="active">
              <a href="javascript:void(0);">1</a>
            </li>
            <li>
              <a href="javascript:void(0);">2</a>
            </li>
            <li>
              <a href="javascript:void(0);">3</a>
            </li>
            <li>
              <a href="javascript:void(0);">4</a>
            </li>
            <li className="arrow">
              <a href="javascript:void(0);">
                <i className="fas fa-angle-right"></i>
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Bookings;
