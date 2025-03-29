import React, { useState } from "react";
import { Input, Button, Dialog } from "@components/ui";
import { PopupProps } from "./Popup.types";
import { useInstruments } from "@hooks/InstrumentsContext";
import API from "@utils/api";
import { validateADI, validateAltitude, validateHIS, validateFlightData } from "@utils/flight.util";
import { useNotification } from "@hooks/NotificationContext";
import { InstrumentsState } from "@utils/types";

const Popup: React.FC<PopupProps> = ({ show, close }) => {
	const { state, setAltitude, setHis, setAdi } = useInstruments();
	const { showNotification } = useNotification();
	if (!show) return null;

	const [localState, setLocalState] = useState<InstrumentsState>({
		altitude: state.altitude,
		his: state.his,
		adi: state.adi,
	});

	const handleSubmit = () => {
		if (!validateFlightData(localState.altitude, localState.his, localState.adi)) {
			return;
		}

		setAltitude(localState.altitude);
		setHis(localState.his);
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
					value={localState.his}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLocalState((prev) => ({ ...prev, his: Number(e.target.value) }))
					}
					error={validateHIS(localState.his) ? "" : "HIS value range is 0 to 360"}
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
