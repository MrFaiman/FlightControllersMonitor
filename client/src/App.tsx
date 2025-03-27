import "./App.css";
import { useState } from "react";
import { Button, Popup } from "./components";
import { DisplayMode } from "./utils/types";
import Instruments from "./components/instruments/Instruments";
import { InstrumentsProvider } from "./hooks/InstrumentsContext";
import { NotificationProvider } from "./hooks/NotificationContext";

function App() {
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [displayMode, setDisplayMode] = useState<DisplayMode>("visual");

	return (
		<>
			<div className="app">
				<div className="buttons">
					<Button
						active={displayMode === "text"}
						size="xl"
						onClick={() => setDisplayMode("text")}
					>
						Text
					</Button>
					<Button
						active={displayMode === "visual"}
						size="xl"
						onClick={() => setDisplayMode("visual")}
					>
						Visual
					</Button>
					<Button size="xl" onClick={() => setShowPopup(true)}>
						+
					</Button>
				</div>
				<br />
				<InstrumentsProvider>
					<NotificationProvider>
						<Popup show={showPopup} close={() => setShowPopup(false)} />
					</NotificationProvider>
					<Instruments displayMode={displayMode} />
				</InstrumentsProvider>
			</div>
		</>
	);
}

export default App;
