import React from "react";
import Generate from "../components/Generate/Generate";
import Layout from "../components/Layout/Layout";
import NewGenerate from "../components/NewGenerate/GenerateCollection";

const GeneratePage = () => {
    return (
        <div>
            <Layout>
                <Generate />
            </Layout>
        </div>
    );
};

export default GeneratePage;
