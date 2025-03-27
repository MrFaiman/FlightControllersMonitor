import { Router, Request, Response } from "express";
import FlightData from "../models/flight.model";
import { v4 as uuidv4 } from "uuid";
import { validateFlightData } from "../utils/flight.utils";
const router = Router();

// Save new flight data
router.post("/", async (req: Request, res: Response) => {
	try {
		const { altitude, hsi, adi } = req.body;
		const id = uuidv4();
		const validatedData = validateFlightData(altitude, hsi, adi);
		const newFlightData = new FlightData({ id, ...validatedData });
		await newFlightData.save();
		res.status(201).json({ data: { id, ...validatedData } });
	} catch (error) {
		res.status(500).json({ message: "Error saving flight data", error });
	}
});

// Get all flight data
router.get("/", async (req: Request, res: Response) => {
	const flightData = await FlightData.find();
	res.json(flightData);
});

// Get flight data by ID
router.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const flightData = await FlightData.findById(id);
	res.json(flightData);
});

// Update flight data by ID
router.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const { altitude, hsi, adi } = req.body;
	const flightData = await FlightData.findByIdAndUpdate(
		id,
		{ altitude, hsi, adi },
		{ new: true }
	);
	res.json(flightData);
});

// Delete flight data by ID
router.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	await FlightData.findByIdAndDelete(id);
	res.json({ message: "Flight data deleted" });
});

export default router;
