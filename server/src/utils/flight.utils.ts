/**
 * Validates flight instrument values to their valid ranges
 */

export const validateHIS = (his: number): boolean => {
	// HIS should be between 0 and 360 degrees
	return his >= 0 && his <= 360;
};

export const validateAltitude = (altitude: number): boolean => {
	// Altitude should be between 0 and 3000
	return altitude >= 0 && altitude <= 3000;
};

export const validateADI = (adi: number): boolean => {
	// ADI (Attitude Direction Indicator) should be between -100 and 100
	return adi >= -100 && adi <= 100;
};

export const validateFlightData = (
	altitude: number,
	his: number,
	adi: number
): boolean => {
	return validateAltitude(altitude) && validateHIS(his) && validateADI(adi);
};
