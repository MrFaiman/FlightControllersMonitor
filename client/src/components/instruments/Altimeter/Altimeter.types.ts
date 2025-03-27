import { BaseInstrumentProps } from "@utils/types";

export interface AltimeterProps extends BaseInstrumentProps {
	value: number;
}

export const MAX_ALTITUDE = 3000;
export const MIN_ALTITUDE = 0;
