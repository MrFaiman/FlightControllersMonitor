import mongoose, { Schema, Document } from "mongoose";

export interface IFlightData extends Document {
	altitude: number;
	his: number;
	adi: number;
}

const FlightSchema: Schema = new Schema(
	{
		altitude: { type: Number, required: true },
		his: { type: Number, required: true },
		adi: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<IFlightData>("FlightData", FlightSchema);
