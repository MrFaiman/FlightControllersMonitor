import "./App.css";
import { useState } from "react";
import { AttitudeIndicator, Altimeter, Compass, Button, Popup } from "./components";

function App() {
	const [showPopup, setShowPopup] = useState<boolean>(false);

	return (
		<>
			<div className="container">
				<h1 style={{ textAlign: "center" }}>Flight Monitor</h1>
				<div className="buttons">
					<Button size="large">Text</Button>
					<Button size="large">Visual</Button>
					<Button size="large" onClick={() => setShowPopup(true)}>
						+
					</Button>
				</div>
				<br />
				<div className="instruments">
					<Altimeter value={700} />
					<Compass value={100} />
					<AttitudeIndicator value={70} />
				</div>
			</div>
			<Popup show={showPopup} onClose={() => setShowPopup(false)} onSubmit={() => {}} />
		</>
	);
}

export default App;
