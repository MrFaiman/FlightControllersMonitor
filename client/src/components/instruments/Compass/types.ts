import { CanvasProps } from "../../../shared/types";

export interface CompassProps extends CanvasProps {
	value: number; // Heading value in degrees (0-360)
	padding?: number;
}

export interface ArrowOptions {
	rotation?: number; // Rotation in radians
	arrowLength?: number; // Length of the arrow
	arrowHeadSize?: number; // Size of the arrow head
	lineWidth?: number; // Width of the arrow line
}
