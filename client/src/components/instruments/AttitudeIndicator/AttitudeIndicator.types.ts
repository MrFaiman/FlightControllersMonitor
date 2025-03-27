import { BaseInstrumentProps } from "@utils/types";

export interface AttitudeIndicatorProps extends BaseInstrumentProps {
	value: number;
}

export const MAX_ADI = 100;
export const MIN_ADI = -100;
