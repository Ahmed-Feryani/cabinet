import React from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { ConsultationCollection } from "../../api/consultations/consultation";
import moment from "moment";
const ConsultationPage = () => {
  const { id } = useParams();
  const consultation = useTracker(() => {
    Meteor.subscribe("consultation");
    return ConsultationCollection.findOne(id);
  });

  return (
    <Layout>
      <div className="content c-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-header text-center">
                <h2>Consultation Details</h2>
              </div>
              <div className="c-group">
                <div className="c-item">
                  <h3>Objective</h3>
                  <p> {consultation?.objective} </p>
                </div>
                <div className="c-item">
                  <h3>Tooth number</h3>
                  <p> {consultation?.toothNumber} </p>
                </div>
              </div>
              <div className="c-group">
                <div className="c-item">
                  <h3>Act</h3>
                  <p> {consultation?.act} </p>
                </div>
                <div className="c-item">
                  <h3> Remark</h3>
                  <p> {consultation?.remark} </p>
                </div>
              </div>

              <div className="c-group">
                <div className="c-item">
                  <h3>Price </h3>
                  <p> {consultation?.price} </p>
                </div>
                <div className="c-item ">
                  <h3>next rdv</h3>
                  <p>
                    {" "}
                    {moment(consultation?.next_date).format(
                      "MM DD, YYYY hh:mm"
                    )}{" "}
                  </p>
                </div>
              </div>

              <h3>Ordonnance </h3>
              <div className="c-group">
                <div className="c-item">
                  <h5> medicament </h5>
                  <p>
                    {" "}
                    {consultation?.ordonnance?.medicament?.medicament_name}{" "}
                  </p>
                </div>
                <div className="c-item">
                  <h5> usage </h5>
                  <p> {consultation?.ordonnance?.medicament?.usage} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConsultationPage;
