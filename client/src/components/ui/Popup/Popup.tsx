import React, { useState } from "react";
import { Input, Button, Dialog } from "@components/ui";
import { PopupProps } from "./Popup.types";
import { useInstruments } from "@hooks/InstrumentsContext";
import API from "@utils/api";
import { validateADI, validateAltitude, validateHSI, validateFlightData } from "@utils/flight.util";
import { useNotification } from "@hooks/NotificationContext";

const Popup: React.FC<PopupProps> = ({ show, close }) => {
	const { state, setAltitude, setHsi, setAdi } = useInstruments();
	const { showNotification } = useNotification();
	if (!show) return null;

	const [localState, setLocalState] = useState({
		altitude: state.altitude,
		hsi: state.hsi,
		adi: state.adi,
	});

	const handleSubmit = () => {
		if (!validateFlightData(localState.altitude, localState.hsi, localState.adi)) {
			return;
		}

		setAltitude(localState.altitude);
		setHsi(localState.hsi);
		setAdi(localState.adi);

		showNotification("Flight data initialized", "success");
		close();

		API.createFlightData(localState)
			.then(() => {
				showNotification("Flight data sent successfully", "success");
			})
			.catch((err: Error) => {
				showNotification("Error sending flight data", "danger");
				console.error(err);
			});
	};

	return (
		<Dialog show={show} close={close}>
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<Input
					type="number"
					id="alt"
					label="Altitude"
					value={localState.altitude}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLocalState((prev) => ({ ...prev, altitude: Number(e.target.value) }))
					}
					error={
						validateAltitude(localState.altitude)
							? ""
							: "Altitude value range is 0 to 3000"
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
					error={validateHSI(localState.hsi) ? "" : "HSI value range is 0 to 360"}
				/>
				<Input
					type="number"
					id="adi"
					label="ADI"
					value={localState.adi}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLocalState((prev) => ({ ...prev, adi: Number(e.target.value) }))
					}
					error={validateADI(localState.adi) ? "" : "ADI value range is -100 to 100"}
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
