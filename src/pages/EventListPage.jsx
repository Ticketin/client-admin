import React from "react";
import EventList from "../components/EventList/EventList";
import Layout from "../components/Layout/Layout";

const EventListPage = () => {
    return (
        <div>
            <Layout>
                <EventList />
            </Layout>
        </div>
    );
};

export default EventListPage;
