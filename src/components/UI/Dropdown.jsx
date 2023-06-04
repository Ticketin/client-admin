import styles from "./Dropdown.module.scss";

const Dropdown = ({
  name,
  label,
  register,
  options,
  errors,
  validationSchema,
}) => {
  return (
    <>
      <div className={styles.formControl}>
        <label htmlFor={name}>{label}</label>
        <select
          className={styles.formSelect}
          {...register(name, validationSchema)}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.type}
            </option>
          ))}
        </select>
      </div>
      {errors && errors[name]?.type === "required" && (
        <p className="error">{errors[name]?.message}</p>
      )}
    </>
  );
};

export default Dropdown;
