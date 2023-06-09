import React from "react";
import ActiveEventList from "../components/ActiveEvents/ActiveEventList";
import Layout from "../components/Layout/Layout";

const ActivatedPage = () => {
  return (
    <div>
      <Layout>
        <ActiveEventList />
      </Layout>
    </div>
  );
};

export default ActivatedPage;
