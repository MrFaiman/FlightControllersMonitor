import React from "react";
import Altimeter from "./Altimeter/Altimeter";
import Compass from "./Compass/Compass";
import AttitudeIndicator from "./AttitudeIndicator/AttitudeIndicator";
import styles from "./Instruments.module.css";
import { useInstruments } from "@hooks/InstrumentsContext";

interface InstrumentsProps {
	displayMode?: "visual" | "text";
}

const Instruments: React.FC<InstrumentsProps> = ({ displayMode = "visual" }) => {
	const { state } = useInstruments();

	return (
		<div className={styles.instruments}>
			<div>
				<Altimeter value={state.altitude} displayMode={displayMode} />
			</div>
			<div>
				<Compass value={state.his} displayMode={displayMode} />
			</div>
			<div>
				<AttitudeIndicator value={state.adi} displayMode={displayMode} />
			</div>
		</div>
	);
};

export default Instruments;
