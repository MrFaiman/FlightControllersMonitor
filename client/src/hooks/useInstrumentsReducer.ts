import { useReducer } from "react";

export interface InstrumentsState {
	adi: number;
	his: number;
	altitude: number;
}

type InstrumentsAction =
	| { type: "SET_ADI"; payload: number }
	| { type: "SET_HIS"; payload: number }
	| { type: "SET_ALTITUDE"; payload: number }
	| { type: "RESET" };

const initialState: InstrumentsState = {
	altitude: 1700,
	his: 45,
	adi: 50,
};

const instrumentsReducer = (
	state: InstrumentsState,
	action: InstrumentsAction
): InstrumentsState => {
	switch (action.type) {
		case "SET_ADI":
			return {
				...state,
				adi: Math.max(-100, Math.min(100, action.payload)),
			};
		case "SET_HIS":
			return {
				...state,
				his: ((action.payload % 360) + 360) % 360,
			};
		case "SET_ALTITUDE":
			return {
				...state,
				altitude: Math.max(0, Math.min(3000, action.payload)),
			};
		case "RESET":
			return initialState;
		default:
			return state;
	}
};

export function useInstrumentsReducer() {
	const [state, dispatch] = useReducer(instrumentsReducer, initialState);

	return {
		state,
		setAdi: (value: number) => dispatch({ type: "SET_ADI", payload: value }),
		setHis: (value: number) => dispatch({ type: "SET_HIS", payload: value }),
		setAltitude: (value: number) => dispatch({ type: "SET_ALTITUDE", payload: value }),
		reset: () => dispatch({ type: "RESET" }),
	};
}
