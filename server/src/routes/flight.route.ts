import { Router, Request, Response } from "express";
import { StatusCodes } from "../utils/statusCodes.js";
import { validateFlightData } from "../utils/flight.utils.js";
import FlightData from "../models/flight.model.js";
const router = Router();

// Save new flight data
router.post("/", async (req: Request, res: Response) => {
	try {
		const { altitude, his, adi } = req.body ?? {};
		if (!validateFlightData(altitude, his, adi)) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Invalid flight data" });
			return;
		}
		const newFlightData = new FlightData({ altitude, his, adi });
		await newFlightData.save();
		res
			.status(StatusCodes.CREATED)
			.json({ message: "Flight data saved successfully" });
	} catch (error) {
		console.error("Error saving flight data:", error);
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Error saving flight data" });
	}
});

export default router;
