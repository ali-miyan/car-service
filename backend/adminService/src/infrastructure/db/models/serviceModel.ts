import { Schema, model, Document } from "mongoose";

export interface ServiceDocument extends Document {
  serviceName: string;
  description: string;
  logoUrl: string;
  subServices: { name: string }[];
  isBlocked: boolean;
}

const companySchema = new Schema<ServiceDocument>(
  {
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String },
    subServices: [{ name: { type: String, required: true } }],
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model<ServiceDocument>("Company", companySchema);
