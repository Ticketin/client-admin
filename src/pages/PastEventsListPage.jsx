import React from "react";
import Layout from "../components/Layout/Layout";
import PastEventsList from "../components/PastEvents/PastEventsList";

const PastEventsListPage = () => {
  return (
    <div>
      <Layout>
        <PastEventsList />
      </Layout>
    </div>
  );
};

export default PastEventsListPage;
