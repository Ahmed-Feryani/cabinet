import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { RdvCollection } from "../../api/rdv/rdv";
import Layout from "../components/layout/Layout";
import BookingWidget from "../components/BookingWidget/BookingWidget";
const RdvListPage = () => {
  const [searchData, setSearchData] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    setSearchData(keyword);
  };

  const rdvList = useTracker(() => {
    Meteor.subscribe("rdv");
    const user = Meteor.user();
    return user?.profile?.isSecretary
      ? RdvCollection.find({
          fullName: { $regex: searchData.toLowerCase() },
        }).fetch()
      : user?.profile?.isDoctor
      ? RdvCollection.find({
          isApproved: true,
          isCanceled: false,
          fullName: { $regex: searchData.toLowerCase() },
        }).fetch()
      : RdvCollection.find({
          userId: Meteor.userId(),
          fullName: { $regex: searchData.toLowerCase() },
        }).fetch();
  });

  return (
    <Layout>
      <div className="content">
        <div className="container-fluid">
          <div className="row align-items-center mb-4">
            <div className="col">
              <h4 className="widget-title mb-0">rdv</h4>
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
                        <span>{rdvList.length}</span>{" "}
                        {`rdv${rdvList.length > 1 ? "s" : ""}`}
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
                      {rdvList?.map((rdv, index) => {
                        return (
                          <div className="col-lg-6  col-md-12" key={rdv._id}>
                            <BookingWidget
                              rdv={rdv}
                              index={index}
                            ></BookingWidget>
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
      </div>
    </Layout>
  );
};

export default RdvListPage;
