import React, { useState, useEffect } from "react";
import ServiceWidget from "../ServiceWidget/ServiceWidget";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import { optionsProfession } from "./options";

import "./style.scss";
import searchBar from "../../../libs/searchBar";
import { useTranslation } from "react-i18next";
const SearchProviders = () => {
  const search = useTracker(() => {
    return searchBar.get("searchBar");
  });
  const [searchData, setSearchData] = useState({
    name: "",
    keyword: "",
  });

  const users = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users
      .find(
        {
          "profile.isPatient": true,
          "profile.fullName": { $regex: searchData.name.toLowerCase() },
          $or: [
            {
              "profile.fullName": { $regex: searchData.keyword.toLowerCase() },
            },
            { "profile.phone": { $regex: searchData.keyword.toLowerCase() } },
            {
              "profile.cin": {
                $regex: searchData.keyword.toLowerCase(),
              },
            },
          ],
        }

        //   {
        //   $or: [
        //     {
        //       "profile.fullName": { $regex: searchData.keyword.toLowerCase() },
        //     },
        //     { "profile.location": { $regex: searchData.keyword.toLowerCase() } },
        //     {
        //       "profile.professionalSpecialty": {
        //         $regex: searchData.keyword.toLowerCase(),
        //       },
        //     },
        //   ],
        //   "profile.isPatient": true,
        //   "profile.fullName": { $regex: searchData.name.toLowerCase() },
        //   "profile.location": { $regex: searchData.location.toLowerCase() },
        //   "profile.professionalSpecialty": {
        //     $regex: searchData.profession.toLowerCase(),
        //   },
        // }
      )
      .fetch();
  });

  useEffect(() => {
    setSearchData({
      name: search.location,
      keyword: search.keyword,
    });
  }, [search.keyword, search.location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchData({
      name: e.target.name.value,
      keyword: e.target.keyword.value,
    });
  };
  const { t } = useTranslation();
  console.log(users);
  return (
    <div>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="breadcrumb-title">
                <h2> {t("Find Patients")}</h2>
              </div>
            </div>
            <div className="col-auto float-end ms-auto breadcrumb-menu">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">{t("Home")}</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {t("Find Patient")}
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
                  <h4 className="card-title mb-4">{t("SearchFilter")}</h4>
                  <form id="search_form" onSubmit={handleSubmit}>
                    <div className="filter-widget">
                      <div className="filter-list">
                        <h4 className="filter-title">{t("Keyword")}</h4>
                        <input
                          defaultValue={search.keyword}
                          name="keyword"
                          type="text"
                          className="form-control"
                          placeholder={t("LookingFor")}
                        />
                      </div>
                      <div className="filter-list">
                        <h4 className="filter-title">{t("name")}</h4>
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder={t("patient name")}
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary btn__submit pl-5 pr-5 btn-block get_services w-100">
                      {t("Search")}
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
                    {`patient${users.length > 1 ? "s" : ""}`}
                  </h4>
                </div>
                <div className="col-md-6 col-auto">
                  <div className="view-icons">
                    <Link to="/" className="grid-view active">
                      <i className="fas fa-th-large"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="row">
                  {users?.map((user) => {
                    return (
                      <div className="col-lg-4 col-md-6" key={user._id}>
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
    </div>
  );
};

export default SearchProviders;
