/**
 * Validates flight instrument values to their valid ranges
 */

export const validateHIS = (his: unknown): boolean => {
	// HIS should be between 0 and 360 degrees
	return typeof his === "number" && Number.isFinite(his) && his >= 0 && his <= 360;
};

export const validateAltitude = (altitude: unknown): boolean => {
	// Altitude should be between 0 and 3000
	return typeof altitude === "number" && Number.isFinite(altitude) && altitude >= 0 && altitude <= 3000;
};

export const validateADI = (adi: unknown): boolean => {
	// ADI (Attitude Direction Indicator) should be between -100 and 100
	return typeof adi === "number" && Number.isFinite(adi) && adi >= -100 && adi <= 100;
};

export const validateFlightData = (
	altitude: unknown,
	his: unknown,
	adi: unknown
): boolean => {
	return validateAltitude(altitude) && validateHIS(his) && validateADI(adi);
};
