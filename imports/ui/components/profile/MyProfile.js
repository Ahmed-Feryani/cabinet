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
import EditIcon from "@mui/icons-material/Edit";
import modal from "../../../libs/modal";
import ModalEditProvider from "../Modal/ModalEditProvider/ModalEditProvider";
import ModalEditClient from "../Modal/ModalEditClient/ModalEditClient";
import EditProfileProvider from "../forms/EditProfileProvider/EditProfileProvider";
import ModalAddSkill from "../Modal/ModalAddSkill/ModalAddSkill";
import AddSkill from "../forms/AddSkill/AddSkill";
import { IconButton } from "@mui/material";

const MyProfile = () => {
  const { id } = useParams();
  const user = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(id);
  });
  const isProvider = useTracker(() => {
    return Meteor?.user()?.profile?.isProvider;
  });

  return (
    <>
      <ModalEditProvider>
        <EditProfileProvider></EditProfileProvider>
      </ModalEditProvider>
      <ModalAddSkill>
        <AddSkill></AddSkill>
      </ModalAddSkill>
      <ModalEditClient>
        <div>client</div>
      </ModalEditClient>
      {false ? (
        <div></div>
      ) : (
        <div className=" profile">
          <div className="row">
            <div className="col-lg-4 col-xl-4">
              <div className="card-box text-center card-box--profile">
                <div className="card-box__edit">
                  <IconButton
                    onClick={() => {
                      modal.set("modalEditProvider", {
                        open: true,
                      });
                    }}
                  >
                    <EditIcon
                      style={{
                        fontSize: "2rem",
                      }}
                    ></EditIcon>
                  </IconButton>
                </div>
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  className="rounded-circle avatar-xl img-thumbnail"
                  alt="profile"
                />
                <h1 className="mb-2">{`${user?.profile?.name} ${user?.profile?.lastName}`}</h1>
                <p className="text-muted">
                  {user?.profile?.professionalSpecialty}
                </p>

                <div className="text-left mt-3">
                  <h4 className="font-13 text-uppercase">About Me :</h4>
                  <p className="text-muted font-13 mb-3">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>{" "}
              {isProvider && (
                <div className="card-box card-box--skill">
                  <div className="card-box__edit">
                    <IconButton
                      onClick={() => {
                        modal.set("modalAddSkill", {
                          open: true,
                        });
                      }}
                    >
                      <EditIcon
                        style={{
                          fontSize: "2rem",
                        }}
                      ></EditIcon>
                    </IconButton>
                  </div>
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

            {isProvider && (
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

export default MyProfile;
