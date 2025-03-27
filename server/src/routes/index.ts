import { Router, Request, Response } from "express";
import flightRoutes from "./flight.routes";

const router = Router();

router.use("/flight", flightRoutes);

router.get("/", (req: Request, res: Response) => {
	res.json({ message: "Flight Instruments API" });
});

export default router;
