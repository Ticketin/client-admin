import React from "react";
import { motion } from "framer-motion";

import styles from "./CheckBox.module.scss";

const CheckBox = ({ name, label, register, type, checked }) => {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.formInput}
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        {...register(name)}
      />
    </div>
  );
};

export default CheckBox;
