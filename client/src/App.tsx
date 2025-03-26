import "./App.css";
import { useState } from "react";
import { AttitudeIndicator, Altimeter, Compass, Button, Popup } from "./components";

function App() {
	const [showDialog, setShowDialog] = useState<boolean>(false);

	return (
		<>
			<div className="container">
				<h1 style={{ textAlign: "center" }}>Flight Monitor</h1>
				<div className="buttons">
					<Button>Text</Button>
					<Button>Visual</Button>
					<Button onClick={() => setShowDialog(true)}>+</Button>
				</div>
				<br />
				<div className="instruments">
					<Altimeter value={700} />
					<Compass value={100} />
					<AttitudeIndicator value={70} />
				</div>
			</div>
			<Popup show={showDialog} onClose={() => setShowDialog(false)} onSubmit={() => {}} />
		</>
	);
}

export default App;
