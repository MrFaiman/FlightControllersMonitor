import "./App.css";
import { AttitudeIndicator, Altimeter, Compass } from "./components";

function App() {
	return (
		<>
			<h1>Flight Monitor</h1>
			<div className="instruments">
				<Altimeter value={0} />
				<Compass value={0} />
				<AttitudeIndicator value={0} />
			</div>
		</>
	);
}

export default App;
