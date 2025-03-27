import React, { useState } from "react";
import { Input, Button, Dialog } from "../";
import { PopupProps } from "./Popup.types";
import { useInstruments } from "../../hooks/InstrumentsContext";

const Popup: React.FC<PopupProps> = ({ show, onClose }) => {
	const { state, setAltitude, setHsi, setAdi } = useInstruments();
	if (!show) return null;

	const [localState, setLocalState] = useState({
		altitude: state.altitude,
		hsi: state.hsi,
		adi: state.adi,
	});

	const handleSubmit = () => {
		setAltitude(localState.altitude);
		setHsi(localState.hsi);
		setAdi(localState.adi);
		onClose();
	};

	return (
		<Dialog show={show} onClose={onClose}>
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<Input
					type="number"
					id="alt"
					label="Altitude"
					value={localState.altitude}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLocalState((prev) => ({ ...prev, altitude: Number(e.target.value) }))
					}
				/>
				<Input
					type="number"
					id="his"
					label="HIS"
					value={localState.hsi}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLocalState((prev) => ({ ...prev, hsi: Number(e.target.value) }))
					}
				/>
				<Input
					type="number"
					id="adi"
					label="ADI"
					value={localState.adi}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLocalState((prev) => ({ ...prev, adi: Number(e.target.value) }))
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
