import { Router, Request, Response } from "express";
import flightRoutes from "./flight.route";

const router = Router();

router.use("/flight", flightRoutes);

router.get("/", (req: Request, res: Response) => {
	res.json({ message: "Flight Instruments API" });
});

export default router;
