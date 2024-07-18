import mongoose, { Document, Schema, model } from 'mongoose';

interface SubService {
  _id: string;
  name: string;
  detail: {
    price: number;
    workingHours: number;
  };
}

export interface IService extends Document {
  _id?: any;
  generalServiceId: string;
  companyId: string;
  selectedHours: string;
  experience: number;
  terms: string;
  images: string[];
  basicPackage: SubService[];
  standardPackage: SubService[];
  premiumPackage: SubService[];
  isBlocked: boolean;
}

const SubServiceSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  detail: {
    price: { type: Number, required: true },
    workingHours: { type: Number, required: true }
  }
}, { _id: false });

const serviceSchema: Schema = new Schema({
  generalServiceId: { type: String, required: true },
  companyId: { type: String, required: true },
  selectedHours: { type: String, required: true },
  experience: { type: Number, required: true },
  terms: { type: String, required: true },
  images: { type: [String], required: true },
  basicPackage: { type: [SubServiceSchema], required: true },
  standardPackage: { type: [SubServiceSchema], required: true },
  premiumPackage: { type: [SubServiceSchema], required: true },
  isBlocked: { type: Boolean, required: true, default: false }
});

export default model<IService>('Service', serviceSchema);
