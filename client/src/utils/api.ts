import { InstrumentsState, ApiResponse } from "@utils/types";

export const API_URL = "/api";

export const createFlightData = async (flightData: InstrumentsState): Promise<ApiResponse> => {
	const response = await fetch(`${API_URL}/flight`, {
		method: "POST",
		body: JSON.stringify(flightData),
	});
	const data = await response.json();
	return data;
};

export default { createFlightData };
