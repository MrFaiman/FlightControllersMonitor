import { BaseInstrumentProps } from "@utils/types";

export interface CompassProps extends BaseInstrumentProps {
	value: number; // Heading value in degrees (0-360)
	padding?: number;
}

export interface ArrowOptions {
	rotation?: number; // Rotation in radians
	arrowLength?: number; // Length of the arrow
	arrowHeadSize?: number; // Size of the arrow head
	lineWidth?: number; // Width of the arrow line
}

export const MAX_HEADING = 360;
export const MIN_HEADING = 0;
