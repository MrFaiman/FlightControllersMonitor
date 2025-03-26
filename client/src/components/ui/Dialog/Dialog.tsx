import React from "react";
import styles from "./Dialog.module.css";
import { DialogProps } from "./types";
import { Button } from "../";

const Dialog: React.FC<DialogProps> = ({ children, onClose, show }) => {
	return show ? (
		<div className={styles.dialog} onClick={onClose}>
			<div className={styles.dialog__content} onClick={(e) => e.stopPropagation()}>
				<Button className={styles.dialog__close} onClick={onClose}>
					X
				</Button>
				<br />
				{children}
				<br />
			</div>
		</div>
	) : null;
};

export default Dialog;
