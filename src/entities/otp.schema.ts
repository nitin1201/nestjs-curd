import { Schema, Document } from 'mongoose';

export interface Otp extends Document {
  userId: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date; // Ensure this field is included
}

export const OtpSchema = new Schema({
  userId: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }, // Ensure this field is included
});
