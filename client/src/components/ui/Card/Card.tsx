import React from "react";
import styles from "@components/ui/Card/Card.module.css";
import { CardProps } from "@components/ui/Card/Card.types";

const Card: React.FC<CardProps> = ({ title, children, align = "left", ...props }) => {
	return (
		<div className={styles.card} {...props}>
			<div className={styles.cardHeader} style={{ justifyContent: align }}>
				<h3 className={styles.cardTitle}>{title}</h3>
			</div>
			<div style={{ textAlign: align }} className={styles.cardContent}>
				{children}
			</div>
		</div>
	);
};

export default Card;
