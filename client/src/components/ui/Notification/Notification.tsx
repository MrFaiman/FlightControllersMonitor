import React, { useEffect } from "react";
import { NotificationProps } from "./Notification.types";
import styles from "./Notification.module.css";

const Notification: React.FC<NotificationProps> = ({
	message,
	variant,
	duration = 3000,
	close,
}) => {
	useEffect(() => {
		if (duration && close) {
			const timer = setTimeout(close, duration);
			return () => clearTimeout(timer);
		}
	}, [duration, close]);

	return (
		<div className={`${styles.notification} ${styles[variant]}`}>
			<span className={styles.message}>{message}</span>
			{close && (
				<button onClick={close} className={styles.closeButton}>
					X
				</button>
			)}
		</div>
	);
};

export default Notification;
