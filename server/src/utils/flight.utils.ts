/**
 * Validates and clamps flight instrument values to their valid ranges
 */

export const validateHSI = (hsi: number): number => {
	// HSI should be between 0 and 360 degrees
	return Math.max(0, Math.min(360, hsi));
};

export const validateAltitude = (altitude: number): number => {
	// Altitude should be between 0 and 3000
	return Math.max(0, Math.min(3000, altitude));
};

export const validateADI = (adi: number): number => {
	// ADI (Attitude Direction Indicator) should be between -100 and 100
	return Math.max(-100, Math.min(100, adi));
};

export const validateFlightData = (
	altitude: number,
	hsi: number,
	adi: number
) => {
	return {
		altitude: validateAltitude(altitude),
		hsi: validateHSI(hsi),
		adi: validateADI(adi),
	};
};
