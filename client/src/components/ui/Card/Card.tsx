import React from "react";
import styles from "./Card.module.css";
import { CardProps } from "./types";

const Card: React.FC<CardProps> = ({ title, children, align = "left", ...props }) => {
	return (
		<div className={styles.card} {...props}>
			<div className={styles.cardHeader}>
				<h3 className={styles.cardTitle}>{title}</h3>
			</div>
			<div style={{ textAlign: align }} className={styles.cardContent}>
				{children}
			</div>
		</div>
	);
};

export default Card;
