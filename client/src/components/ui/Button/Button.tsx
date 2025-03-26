import React from "react";
import { ButtonProps } from "./types";
import styles from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({
	children,
	className,
	active,
	variant = "default",
	...props
}) => {
	let classList = [styles.button];
	if (active) classList.push(styles.active);
	classList.push(styles[variant]);
	if (className) classList.push(className);

	return (
		<button className={classList.join(" ")} {...props}>
			{children}
		</button>
	);
};

export default Button;
