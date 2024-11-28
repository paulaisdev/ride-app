import mongoose, { Schema, Document } from "mongoose";

export interface Ride extends Document {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
  createdAt: Date;
}

const RideSchema: Schema = new Schema({
  customer_id: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  driver: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  value: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Ride>("Ride", RideSchema);
