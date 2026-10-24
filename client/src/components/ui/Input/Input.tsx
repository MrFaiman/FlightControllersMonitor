import React, { useId } from "react";
import { InputProps } from "./Input.types";
import styles from "./Input.module.css";

const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const inputClasses = [styles.input, error ? styles.error : "", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={styles.container}>
			{label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
			<input id={inputId} className={inputClasses} {...props} />
			{error && <span className={styles.errorMessage}>{error}</span>}
		</div>
	);
};

export default Input;
