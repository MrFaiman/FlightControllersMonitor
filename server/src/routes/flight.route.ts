import { Router, Request, Response } from "express";
import FlightData from "../models/flight.model";
import { validateFlightData } from "../utils/flight.utils";
const router = Router();

// Save new flight data
router.post("/", async (req: Request, res: Response) => {
	try {
		const { altitude, his, adi } = req.body;
		const validatedData = validateFlightData(altitude, his, adi);
		const newFlightData = new FlightData(validatedData);
		await newFlightData.save();
		res.status(201).json({ data: validatedData });
	} catch (error) {
		res.status(500).json({ message: "Error saving flight data", error });
	}
});

export default router;
