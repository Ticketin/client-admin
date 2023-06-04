import React from "react";

import styles from "./Button.module.scss";

const Button = ({ type, form, onSubmit, size, shape, content }) => {
  return (
    <button
      form={form}
      type={type}
      onClick={onSubmit}
      className={`${styles["button"]} ${styles[type]} ${styles[size]} ${styles[shape]}`}
    >
      {content}
    </button>
  );
};

export default Button;
