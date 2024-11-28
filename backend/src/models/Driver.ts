// src/models/Driver.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Driver extends Document {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  ratePerKm: number;
  minKm: number;
}

const DriverSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  vehicle: { type: String, required: true },
  review: {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  ratePerKm: { type: Number, required: true },
  minKm: { type: Number, required: true },
});

export default mongoose.model<Driver>("Driver", DriverSchema);
