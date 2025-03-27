export interface CanvasProps {
	width?: number;
	height?: number;
}

export type DisplayMode = "visual" | "text";

export interface BaseInstrumentProps extends CanvasProps {
	displayMode?: DisplayMode;
}
