import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useTracker } from "meteor/react-meteor-data";
const UsersPage = () => {
  const [searchData, setSearchData] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    setSearchData(keyword);
  };
  const users = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users
      .find({
        "profile.fullName": { $regex: searchData.toLowerCase() },
      })
      .fetch();
  });
  const delUserHandler = (id) => {
    Meteor.subscribe("allUsers");
    Meteor.users.remove(id);
  };

  const changeRoleHandler = (e, id) => {
    const role = e.target.value;
    console.log(role);
    if (role === "admin") {
      Meteor.users.update(
        { _id: id },
        {
          $set: {
            "profile.isAdmin": true,
            "profile.isSecretary": false,
            "profile.isPatient": false,
            "profile.isDoctor": false,
          },
        }
      );
    }
    if (role === "patient") {
      Meteor.users.update(
        { _id: id },
        {
          $set: {
            "profile.isAdmin": false,
            "profile.isSecretary": false,
            "profile.isPatient": true,
            "profile.isDoctor": false,
          },
        }
      );
    }
    if (role === "secretary") {
      Meteor.users.update(
        { _id: id },
        {
          $set: {
            "profile.isAdmin": false,
            "profile.isSecretary": true,
            "profile.isPatient": false,
            "profile.isDoctor": false,
          },
        }
      );
    }
    if (role === "doctor") {
      Meteor.users.update(
        { _id: id },
        {
          $set: {
            "profile.isAdmin": false,
            "profile.isSecretary": false,
            "profile.isPatient": false,
            "profile.isDoctor": true,
          },
        }
      );
    }
  };

  return (
    <Layout>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 theiaStickySidebar">
              <div className="card filter-card">
                <div className="card-body">
                  <h4 className="card-title mb-4">SearchFilter</h4>
                  <form id="search_form" onSubmit={submitHandler}>
                    <div className="filter-widget">
                      <div className="filter-list">
                        <h4 className="filter-title">Keyword</h4>
                        <input
                          name="keyword"
                          type="text"
                          className="form-control"
                          placeholder="LookingFor"
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary btn__submit pl-5 pr-5 btn-block get_services w-100">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row align-items-center mb-4">
                <div className="col-md-6 col">
                  <h4>
                    <span>{users.length}</span>{" "}
                    {`user${users.length > 1 ? "s" : ""}`}
                  </h4>
                </div>
                <div className="col-md-6 col-auto">
                  <div className="view-icons">
                    <i className="fas fa-th-large"></i>
                  </div>
                </div>
              </div>
              <div>
                <div className="row">
                  {users?.map((user) => {
                    const role = user?.profile?.isPatient
                      ? "patient"
                      : user?.profile?.isAdmin
                      ? "admin"
                      : user?.profile?.isSecretary
                      ? "secretary"
                      : "doctor";

                    return (
                      <div className="user-card">
                        {`${user?.profile?.name} ${user?.profile?.lastName}`}

                        <div className="user-card__action">
                          {" "}
                          <select
                            onChange={(e) => {
                              changeRoleHandler(e, user._id);
                            }}
                          >
                            <option value="admin" selected={role === "admin"}>
                              Admin
                            </option>
                            <option
                              value="secretary"
                              selected={role === "secretary"}
                            >
                              Secretary
                            </option>
                            <option
                              value="patient"
                              selected={role === "patient"}
                            >
                              Patient
                            </option>
                            <option value="doctor" selected={role === "doctor"}>
                              Doctor
                            </option>
                          </select>
                          <button
                            className="btn btn-danger"
                            onClick={() => delUserHandler(user?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;
