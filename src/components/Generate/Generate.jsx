import React from "react";
import Layout from "../Layout/Layout";

import styles from "./Generate.module.scss";
import Sidebar from "../Layout/Sidebar";
import GenerateForm from "./GenerateForm";
import UploadImage from "./UploadImage";
import Button from "../UI/Button";

const Generate = () => {
    return (
            <div className={styles.generate}>
                <h4>Generate ticket</h4>
                <div className={styles.row}>
                    <div className={styles.formWrapper}>
                        <GenerateForm />
                    </div>
                    <div className={styles.uploadImageWrapper}>
                        <UploadImage />
                        <div className={styles.buttonWrapper}>
                            <Button content="generate" size="medium" />
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default Generate;
