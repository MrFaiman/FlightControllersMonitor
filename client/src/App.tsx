import "./App.css";
import { useState } from "react";
import { Button, Popup } from "./components";
import { DisplayMode } from "./shared/types";
import Instruments from "./components/instruments/Instruments";
import { InstrumentsProvider } from "./hooks/InstrumentsContext";

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
					<Instruments displayMode={displayMode} />
					<Popup show={showPopup} onClose={() => setShowPopup(false)} />
				</InstrumentsProvider>
			</div>
		</>
	);
}

export default App;
