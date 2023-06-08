import React, { useState } from "react";
import Layout from "../Layout/Layout";

import styles from "./GenerateTicket.module.scss";
import Sidebar from "../Layout/Sidebar";
import UploadImage from "./UploadImage";
import Button from "../UI/Button";
import GenerateTicketForm from "./GenerateTicketForm";

const GenerateTicket = () => {
  const [image, setImage] = useState();

  const handleUpload = (upload) => {
    console.log(`setting image`);
    setImage(upload);
  };

  return (
    <div className={styles.generate}>
      <h4>Generate Ticket</h4>
      <div className={styles.row}>
        <div className={styles.formWrapper}>
          <GenerateTicketForm uploadedImage={image} />
        </div>
        <div className={styles.uploadImageWrapper}>
          <UploadImage onUpload={handleUpload} />
          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              form="generate-ticket-form"
              content="Generate"
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateTicket;
