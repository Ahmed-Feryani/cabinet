import React from "react";
import Bookings from "../components/Bookings/Bookings";
import Layout from "../components/layout/Layout";
import { useTracker } from "meteor/react-meteor-data";
import ServicesProvider from "../components/ServicesProvider/ServicesProvider";

const ServicesPage = () => {
  const isProvider = useTracker(() => {
    return Meteor?.user()?.profile?.isProvider;
  });

  return (
    <Layout>
      {isProvider ? (
        <ServicesProvider></ServicesProvider>
      ) : (
        <Bookings></Bookings>
      )}
    </Layout>
  );
};

export default ServicesPage;
