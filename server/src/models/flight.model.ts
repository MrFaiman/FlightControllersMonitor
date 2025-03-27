import mongoose, { Schema, Document } from "mongoose";

export interface IFlightData extends Document {
	id: string;
	altitude: number;
	hsi: number;
	adi: number;
}

const FlightSchema: Schema = new Schema(
	{
		id: { type: String, required: true },
		altitude: { type: Number, required: true },
		hsi: { type: Number, required: true },
		adi: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<IFlightData>("FlightData", FlightSchema);
