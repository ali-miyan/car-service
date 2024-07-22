import { Schema, model, Document } from "mongoose";

export interface IUserData extends Document {
  username: string;
  email: string;
  phone: number | null;
  profileImg: string | null;
  password: string;
  isBlocked: boolean;
}

const userSchema = new Schema<IUserData>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, default: null },
  profileImg: { type: String, default: null },
  password: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});

export default model<IUserData>("User", userSchema);
