import React, { useState } from "react";
import moment from "moment";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import "./style.scss";
import ModalCancelRdv from "../Modal/ModalCancelRdv/ModalCancelRdv";
import modal from "../../../libs/modal";

const BookingWidget = (props) => {
  const [selected, setselected] = useState(null);
  const patient = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(props?.rdv?.userId);
  });
  const user = useTracker(() => {
    return Meteor.user();
  });
  const cancelRdvHandler = (id) => {
    Meteor.call("rdv.update.cancel", id);
  };
  const badge = () => {
    if (props?.rdv?.isCanceled) {
      return <span className="badge badge-pill badge-danger">Canceled</span>;
    }
    if (props?.rdv?.isApproved) {
      return <span className="badge badge-pill badge-success">Fixed</span>;
    }

    return <span className="badge badge-pill badge-prof">Pending</span>;
  };

  return (
    <div className="bookings">
      {selected === props.index && (
        <ModalCancelRdv
          id={props?.rdv?._id}
          setselected={setselected}
        ></ModalCancelRdv>
      )}

      <div className="booking-list">
        <div className="info-box">
          <div>{badge()}</div>

          <div className="booking-widget__btn">
            {user?.profile?.isSecretary && (
              <Link
                to={`/fix-rdv/${props?.rdv?._id}`}
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#login_modal"
              >
                Fix rdv
              </Link>
            )}
            {user?.profile?.isSecretary && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setselected(props.index);
                  modal.set("modalCancelRdv", {
                    open: true,
                  });
                }}
              >
                cancel rdv
              </button>
            )}
            {user?.profile?.isPatient && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setselected(props.index);
                  modal.set("modalCancelRdv", {
                    open: true,
                  });
                }}
              >
                cancel rdv
              </button>
            )}
            {user?.profile?.isDoctor && (
              <Link
                className="btn btn-primary"
                to={`/add-consultation/${props?.rdv?._id}/${props?.rdv?.userId}`}
              >
                consultation
              </Link>
            )}
            {user?.profile?.isDoctor && (
              <Link
                className="btn btn-primary"
                to={`/profile/${props?.rdv?.userId}`}
              >
                patient file
              </Link>
            )}
          </div>
        </div>
        <div className="booking-widget">
          <div className="booking-det-info">
            <ul className="booking-details">
              {/* <li>
                <span>Booking Date</span>{" "}
                {moment(createdAt).format("MM DD YYYY")}
                {badge()}
              </li> */}
              <li>
                <span>Rdv Date</span>{" "}
                {moment(props?.rdv?.date).format("MM DD YYYY")}
              </li>
              {/* <li>
                <span>Booking time</span> {moment(createdAt).format("hh:mm")}{" "}
              </li> */}
              <li>
                <span>Rdv time</span>
                {moment(props?.rdv?.date).format("hh:mm")}{" "}
              </li>
              {/* <li>
                <span>Amount</span> $100
              </li> */}

              {/* <li>
                <span>Phone</span> 412-355-7471
              </li> */}
              <li>
                <span> Patient </span>

                {`${patient?.profile?.name} ${patient?.profile?.lastName}`}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
