import React, { useState } from "react";
import styles from "./Generate.module.scss";
import GenerateForm from "./GenerateForm";
import UploadImage from "./UploadImage";
import Button from "../UI/Button";

const Generate = () => {
  const [image, setImage] = useState();
  const [isUploadingIPFS, setIsUploadingIPFS] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();

  const handleUpload = (upload) => {
    console.log(`setting image`);
    setImage(upload);
  };

  const uploadIPFSHandler = (props) => {
    setIsUploadingIPFS(props);
  };

  const errorHandler = (props) => {
    setIsError(props);
  };

  const loadingHandler = (props) => {
    setIsLoading(props);
  };

  const successHandler = (props) => {
    setIsSuccess(props);
  };

  return (
    <div className={styles.generate}>
      <h4>Generate Event</h4>
      <div className={styles.row}>
        <div className={styles.formWrapper}>
          <GenerateForm
            uploadedImage={image}
            onUploadIPFS={uploadIPFSHandler}
            onError={errorHandler}
            onLoading={loadingHandler}
            onSuccess={successHandler}
          />
        </div>
        <div className={styles.uploadImageWrapper}>
          <UploadImage onUpload={handleUpload} />
          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              form="generate-form"
              content="Generate"
              size="medium"
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
