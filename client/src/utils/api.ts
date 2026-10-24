import { InstrumentsState, ApiResponse } from "@utils/types";

export const API_URL = "/api";

export const createFlightData = async (flightData: InstrumentsState): Promise<ApiResponse> => {
	const response = await fetch(`${API_URL}/flight`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(flightData),
	});
	const data: ApiResponse = await response.json();
	if (!response.ok) {
		throw new Error(data.message || `Request failed (${response.status})`);
	}
	return data;
};

export default { createFlightData };
