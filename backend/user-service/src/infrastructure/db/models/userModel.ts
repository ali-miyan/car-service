import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  phone: number | null;
  password: string;
  isBlocked: boolean;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, },
  phone: {type:Number,default:null},
  password: { type: String,required:true },
  isBlocked: { type: Boolean, default: false },
});

export default model<UserDocument>("User", userSchema);
