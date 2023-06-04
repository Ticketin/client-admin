import { motion } from "framer-motion";

import styles from "./DateField.module.scss";

const DateField = ({ name, label, placeholder, register, readOnly, errors, required, type, validationSchema }) => {
    const variants = {
        valid: {
            backgroundColor: "#ffffff",  
            transition: { duration: 0.3 },
        },
        error: {
            outline: "1px solid #fca5a5",
            backgroundColor: "#fef2f2",
            borderLeft: "5px solid #f87171",
            borderTop: "none",
            borderBottom: "none",
            borderRight: "none",
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>
                {label}
                {required && "*"}
            </label>
            <motion.input type="datetime-local" className={styles.formDateField} readOnly={readOnly} data-isreadonly={readOnly} animate={errors[name] ? "error" : "valid"} variants={variants} id={name} name={name} {...register(name, validationSchema)} />
            {errors[name] && <p className={styles.errorMessage}>{errors[name]?.message}</p>}
        </div>
    );
};

export default DateField;
