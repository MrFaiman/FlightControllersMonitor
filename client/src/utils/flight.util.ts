/**
 * Validates flight instrument values to their valid ranges
 */

export const validateHSI = (hsi: number): boolean => {
	// HSI should be between 0 and 360 degrees
	return hsi >= 0 && hsi <= 360;
};

export const validateAltitude = (altitude: number): boolean => {
	// Altitude should be between 0 and 3000
	return altitude >= 0 && altitude <= 3000;
};

export const validateADI = (adi: number): boolean => {
	// ADI (Attitude Direction Indicator) should be between -100 and 100
	return adi >= -100 && adi <= 100;
};

export const validateFlightData = (altitude: number, hsi: number, adi: number): boolean => {
	return validateAltitude(altitude) && validateHSI(hsi) && validateADI(adi);
};
