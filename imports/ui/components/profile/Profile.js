import React from "react";
import { useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { getProfileById } from "../../redux/actions/profile";
//import { current } from "../../redux/actions/user";
//import { getProfessionalRepairs } from "../../redux/actions/repair";
//import Review from "./reviews/Reviews";
//import Spinner from "../layout/Spinner";
import "./profile.scss";
import "./profile_label.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Review from "./reviews/Reviews";
import { useTracker } from "meteor/react-meteor-data";
const Profile = () => {
  const { id } = useParams();
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(id);
  });
  const isClient = useTracker(() => {
    return Meteor?.user()?.profile?.isClient;
  });

  //   //   const [img, setImg] = useState("");
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(current());
  //     dispatch(getProfileById(id));
  //     dispatch(getProfessionalRepairs(id));
  //   }, [id, dispatch]);

  //   const profile = useSelector((state) => state.profileReducer.profile);
  //   const loading = useSelector((state) => state.userReducer.loading);
  //   // const loadingPro = useSelector((state) => state.profileReducer.loading);
  //   const isAuth = useSelector((state) => state.profileReducer.isAuth);
  //   const user = useSelector((state) => state.userReducer.user);
  //   const repairs = useSelector((state) => state.repairReducer.repairs);

  return (
    <>
      {false ? (
        <div></div>
      ) : (
        <div className=" profile">
          <div className="row">
            <div className="col-lg-4 col-xl-4">
              <div className="card-box text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  className="rounded-circle avatar-xl img-thumbnail"
                  alt="profile"
                />
                <h1 className="mb-2">{`${user?.profile?.name} ${user?.profile?.lastName}`}</h1>
                <p className="text-muted">
                  {user?.profile?.professionalSpecialty}
                </p>
                {isClient && (
                  <Link to={`/add_service/${id}`}>
                    <button
                      type="button"
                      className="btn btn-dark btn-xs waves-effect mb-2 waves-light"
                    >
                      Send request
                    </button>
                  </Link>
                )}

                <div className="text-left mt-3">
                  <h4 className="font-13 text-uppercase">About Me :</h4>
                  <p className="text-muted font-13 mb-3">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>{" "}
              {/* end card-box */}
              {user?.profile?.isProvider && (
                <div className="card-box">
                  <h4 className="header-title">Skills</h4>
                  <p className="mb-3">
                    Everyone realizes why a new common language would be
                    desirable
                  </p>

                  <div className="skills">
                    {user?.profile?.skills.map((skill, idx) => (
                      <div className="skill" key={idx}>
                        <i className="far fa-lightbulb"></i> {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}{" "}
            </div>

            {user?.profile?.isProvider && (
              <div className="col-lg-8 col-xl-8">
                <div className="card-box">
                  <div className="tab-content">
                    <div>
                      <h2 className="container">Projects</h2>
                      <Review id={id}></Review>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
