import React, { useState } from "react";
import Layout from "../Layout/Layout";

import styles from "./GenerateCollection.module.scss";
import Sidebar from "../Layout/Sidebar";
import UploadImage from "./UploadImage";
import Button from "../UI/Button";
import GenerateCollectionForm from "./GenerateCollectionForm";

const GenerateCollection = () => {
  const [image, setImage] = useState();

  const handleUpload = (upload) => {
    console.log(`setting image`);
    setImage(upload);
  };

  return (
    <div className={styles.generate}>
      <h4>Generate Event</h4>
      <div className={styles.row}>
        <div className={styles.formWrapper}>
          <GenerateCollectionForm collectionImage={image} />
        </div>
        <div className={styles.uploadImageWrapper}>
          <UploadImage onUpload={handleUpload} />
          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              form="generate-collection-form"
              content="Next ->"
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCollection;
