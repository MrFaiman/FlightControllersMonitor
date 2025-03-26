import React from "react";
import { InputProps } from "./types";
import styles from "./Input.module.css";

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
	const inputClasses = [styles.input, error ? styles.error : "", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={styles.container}>
			{label && <label className={styles.label}>{label}</label>}
			<input className={inputClasses} {...props} />
			{error && <span className={styles.errorMessage}>{error}</span>}
		</div>
	);
};

export default Input;
