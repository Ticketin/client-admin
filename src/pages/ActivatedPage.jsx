import React from "react";
import ActivatedEventList from "../components/Activated/ActivatedEventList";
import Layout from "../components/Layout/Layout";

const ActivatedPage = () => {
    return (
        <div>
            <Layout>
                <ActivatedEventList />
            </Layout>
        </div>
    );
};

export default ActivatedPage;
