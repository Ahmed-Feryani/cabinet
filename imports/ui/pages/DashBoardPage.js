import React from "react";
import DashboardClient from "../components/DashBoardClient/DashboardClient";
import DashboardProvider from "../components/DashboardProvider/DashboardProvider";
import Layout from "../components/layout/Layout";
import { useTracker } from "meteor/react-meteor-data";
const DashBoardPage = () => {
  const isSecretary = useTracker(() => {
    return Meteor?.user()?.profile?.isSecretary;
  });
  const isPatient = useTracker(() => {
    return Meteor?.user()?.profile?.isPatient;
  });
  return (
    <Layout>
      {isSecretary && <DashboardProvider></DashboardProvider>}
      {isPatient && <DashboardClient></DashboardClient>}
    </Layout>
  );
};

export default DashBoardPage;
