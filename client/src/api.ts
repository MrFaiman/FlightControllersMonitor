export const API_URL = "http://localhost:5000/api";

export const getFlightData = async (id: string) => {
	const response = await fetch(`${API_URL}/flight/${id}`);
	return response.json();
};

export const createFlightData = async (flightData: any) => {
	const response = await fetch(`${API_URL}/flight`, {
		method: "POST",
		body: JSON.stringify(flightData),
	});
	return response.json();
};

export const updateFlightData = async (id: string, flightData: any) => {
	const response = await fetch(`${API_URL}/flight/${id}`, {
		method: "PUT",
		body: JSON.stringify(flightData),
	});
	return response.json();
};

export default { getFlightData, createFlightData, updateFlightData };
