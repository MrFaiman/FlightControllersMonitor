import React, { useEffect } from "react";
import Altimeter from "./Altimeter/Altimeter";
import Compass from "./Compass/Compass";
import AttitudeIndicator from "./AttitudeIndicator/AttitudeIndicator";
import styles from "./Instruments.module.css";
import { useInstruments } from "../../hooks/InstrumentsContext";
import API from "../../utils/api";

interface InstrumentsProps {
	displayMode?: "visual" | "text";
}

const Instruments: React.FC<InstrumentsProps> = ({ displayMode = "visual" }) => {
	const { state, setAltitude, setHsi, setAdi } = useInstruments();

	useEffect(() => {
		if (localStorage.getItem("flightId")) {
			API.getFlightData(localStorage.getItem("flightId")!).then((res) => {
				setAltitude(res.data.altitude);
				setHsi(res.data.hsi);
				setAdi(res.data.adi);
			});
		}
	}, []);

	return (
		<div className={styles.instruments}>
			<div>
				<Altimeter value={state.altitude} displayMode={displayMode} />
			</div>
			<div>
				<Compass value={state.hsi} displayMode={displayMode} />
			</div>
			<div>
				<AttitudeIndicator value={state.adi} displayMode={displayMode} />
			</div>
		</div>
	);
};

export default Instruments;
