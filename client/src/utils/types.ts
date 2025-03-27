export interface CanvasProps {
	width?: number;
	height?: number;
}

export interface InstrumentsState {
	adi: number;
	his: number;
	altitude: number;
}

export type DisplayMode = "visual" | "text";

export interface BaseInstrumentProps extends CanvasProps {
	displayMode?: DisplayMode;
}

export interface ApiResponse {
	data: InstrumentsState;
	message: string;
	error: string;
}
