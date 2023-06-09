import React from "react";

import styles from "./Button.module.scss";

const Button = ({
  type,
  form,
  onSubmit,
  size,
  shape,
  content,
  isLoading,
  isError,
  isSuccess,
}) => {
  const getContent = () => {
    if (isLoading) {
      return "Loading...";
    } else if (isError) {
      return "Error";
    } else if (isSuccess) {
      return "Success";
    } else {
      return content;
    }
  };

  return (
    <button
      form={form}
      type={type}
      onClick={onSubmit}
      className={`${styles["button"]} ${styles[type]} ${styles[size]} ${styles[shape]} ${isSuccess ? styles.success :''}`}
      disabled={isSuccess || isError || isLoading}
    >
      {getContent()}
    </button>
  );
};

export default Button;
