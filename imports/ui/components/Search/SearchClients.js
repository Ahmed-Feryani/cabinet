import React, { useState } from "react";
import ServiceWidget from "../ServiceWidget/ServiceWidget";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
const SearchClients = () => {
  const [profession, setprofession] = useState("");
  const [city, setcity] = useState("");

  const users = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.find({ "profile.isClient": true }).fetch();
  });
  return (
    <div>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="breadcrumb-title">
                <h2>Customers</h2>
              </div>
            </div>
            <div className="col-auto float-end ms-auto breadcrumb-menu">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Find a Client
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 theiaStickySidebar">
              <div className="card filter-card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Search Filter</h4>
                  <form id="search_form">
                    <div className="filter-widget">
                      <div className="filter-list">
                        <h4 className="filter-title">Keyword</h4>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="What are you looking for?"
                        />
                      </div>
                      <div className="filter-list">
                        <h4 className="filter-title">Sort By</h4>
                        <select className="form-control selectbox select form-select">
                          <option>Sort By</option>
                          <option>Price Low to High</option>
                          <option>Price High to Low</option>
                          <option>Newest</option>
                        </select>
                      </div>
                      <div className="filter-list">
                        <h4 className="filter-title">Categories</h4>
                        <select className="form-control form-control selectbox select form-select">
                          <option>All Categories</option>
                          <option>Computer</option>
                          <option selected="">Automobile</option>
                          <option>Car Wash</option>
                          <option>Cleaning</option>
                          <option>Electrical</option>
                          <option>Construction</option>
                        </select>
                      </div>
                      <div className="filter-list">
                        <h4 className="filter-title">Location</h4>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Search Location"
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary pl-5 pr-5 btn-block get_services w-100"
                      type="button"
                    >
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
                    <span>118</span> Services
                  </h4>
                </div>
                <div className="col-md-6 col-auto">
                  <div className="view-icons">
                    <a href="javascript:void(0);" className="grid-view active">
                      <i className="fas fa-th-large"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div className="row">
                  {users?.map((user) => {
                    return (
                      <div className="col-lg-4 col-md-6">
                        <Link to={`/profile/${user._id}`}>
                          <ServiceWidget
                            profile={user?.profile}
                            user={user}
                          ></ServiceWidget>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ﻿
    </div>
  );
};

export default SearchClients;
