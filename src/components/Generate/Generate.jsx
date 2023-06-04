import React, { useState } from "react";
import Layout from "../Layout/Layout";

import styles from "./Generate.module.scss";
import Sidebar from "../Layout/Sidebar";
import GenerateForm from "./GenerateForm";
import UploadImage from "./UploadImage";
import Button from "../UI/Button";

const Generate = () => {
    const [image, setImage] = useState();

    const handleUpload = (upload) => {
        console.log(`setting image`)
        setImage(upload)
    }

    return (
            <div className={styles.generate}>
                <h4>Generate Event</h4>
                <div className={styles.row}>
                    <div className={styles.formWrapper}>
                        <GenerateForm uploadedImage={image}/>
                    </div>
                    <div className={styles.uploadImageWrapper}>
                        <UploadImage onUpload={handleUpload}/>
                        <div className={styles.buttonWrapper}>
                            <Button type="submit" form="generate-form" content="generate" size="medium" />
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Generate;
