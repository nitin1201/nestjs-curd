import { Schema, Document } from 'mongoose';

export const UsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // other fields as needed
});

export interface Users extends Document {
  email: string;
  password: string;
  // other fields as needed
}
