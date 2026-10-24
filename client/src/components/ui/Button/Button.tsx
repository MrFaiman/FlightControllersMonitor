import React from "react";
import { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({
	children,
	className,
	active,
	variant = "default",
	size = "medium",
	...props
}) => {
	const classList = [styles.button];
	if (active) classList.push(styles.active);
	classList.push(styles[variant]);
	classList.push(styles[size]);
	if (className) classList.push(className);

	return (
		<button className={classList.join(" ")} {...props}>
			{children}
		</button>
	);
};

export default Button;
