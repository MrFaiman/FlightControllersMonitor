export interface CanvasProps {
	width?: number;
	height?: number;
}

export type DisplayMode = "visual" | "text";

export interface BaseInstrumentProps extends CanvasProps {
	displayMode?: DisplayMode;
}

export interface FlightData {
	altitude: number;
	his: number;
	adi: number;
}

export interface ApiResponse {
	data: FlightData;
	message: string;
	error: string;
}
