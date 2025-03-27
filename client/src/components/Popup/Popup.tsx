import React, { useState } from "react";
import { Input, Button, Dialog } from "../";
import { PopupProps } from "./Popup.types";

const Popup: React.FC<PopupProps> = ({ show, onClose, onSubmit }) => {
	const [alt, setAlt] = useState(0);
	const [his, setHis] = useState(0);
	const [adi, setAdi] = useState(0);

	const handleSubmit = () => {
		onSubmit({ alt, his, adi });
		onClose();
	};

	return (
		<Dialog show={show} onClose={onClose}>
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<Input
					type="number"
					id="alt"
					label="Altitude"
					value={alt}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setAlt(Number(e.target.value))
					}
				/>
				<Input
					type="number"
					id="his"
					label="HIS"
					value={his}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setHis(Number(e.target.value))
					}
				/>
				<Input
					type="number"
					id="adi"
					label="ADI"
					value={adi}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setAdi(Number(e.target.value))
					}
				/>
			</div>
			<br />
			<Button variant="success" onClick={handleSubmit}>
				<span>Send</span>
			</Button>
		</Dialog>
	);
};

export default Popup;
