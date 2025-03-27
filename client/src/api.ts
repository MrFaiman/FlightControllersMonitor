export const API_URL = "/api";

export const createFlightData = async (flightData: any) => {
	const response = await fetch(`${API_URL}/flight`, {
		method: "POST",
		body: JSON.stringify(flightData),
	});
	return response.json();
};

export default { createFlightData };
