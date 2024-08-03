import mongoose, { Document, Schema, model, Types } from "mongoose";

interface SubServiceInfo {
  _id: string;
  name: string;
}

interface SubService {
  subServices: SubServiceInfo[];
  detail: {
    price: number;
    workingHours: number;
  };
}

export interface IService extends Document {
  generalServiceId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  selectedHours: string;
  servicePlace: string;
  servicesPerDay:string;
  terms: string;
  images: string[];
  basicPackage: SubService;
  standardPackage: SubService;
  premiumPackage: SubService;
  isBlocked: boolean;
}

const SubServiceInfoSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const SubServiceSchema: Schema = new Schema(
  {
    subServices: { type: [SubServiceInfoSchema], required: true },
    detail: {
      price: { type: Number, required: true },
      workingHours: { type: Number, required: true },
    },
  },
  { _id: false }
);

const serviceSchema: Schema = new Schema(
  {
    generalServiceId: {
      type: Schema.Types.ObjectId,
      ref: "GeneralService",
      required: true,
    },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    selectedHours: { type: String, required: true },
    servicePlace: { type: String, required: true },
    servicesPerDay: { type: String, required: true },
    terms: { type: String, required: true },
    images: { type: [String], required: true },
    basicPackage: { type: SubServiceSchema, required: true },
    standardPackage: { type: SubServiceSchema, required: true },
    premiumPackage: { type: SubServiceSchema, required: true },
    isBlocked: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Service = model<IService>("Service", serviceSchema);

export default Service;
