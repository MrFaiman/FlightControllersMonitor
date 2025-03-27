import React from "react";
import styles from "./Dialog.module.css";
import { DialogProps } from "./Dialog.types";
import { Button } from "../";

const Dialog: React.FC<DialogProps> = ({ children, close, show }) => {
	return show ? (
		<div className={styles.dialog} onClick={close}>
			<div className={styles.dialog__content} onClick={(e) => e.stopPropagation()}>
				<Button className={styles.dialog__close} onClick={close}>
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
