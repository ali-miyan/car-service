import { Schema, model, Document } from "mongoose";

export interface CompanyDocument extends Document {
  ownerName: string;
  companyName: string;
  year: number;
  logo: string;
  contact1: number;
  contact2: number;
  email: string;
  licenseNumber: number;
  licenseExpiry: string;
  password: string;
  licenseImg: string;
  approvedImg: string;
  isBlocked: boolean;
}

const companySchema = new Schema<CompanyDocument>({
  ownerName: { type: String, required: true },
  companyName: { type: String, required: true },
  year: { type: Number, required: true },
  logo: { type: String, required: true },
  contact1: { type: Number, required: true },
  contact2: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  licenseNumber: { type: Number },
  licenseExpiry: { type: String },
  password: { type: String, required: true },
  licenseImg: { type: String, required: true },
  approvedImg: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});

export default model<CompanyDocument>("Company", companySchema);
