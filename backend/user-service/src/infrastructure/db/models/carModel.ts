import mongoose, { Schema, Document } from 'mongoose';

export interface ICarData extends Document{
  name: string;
  color: string;
  src: string;
  vin: string;
}

const carSchema = new Schema<ICarData>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  src: { type: String, required: true },
  vin: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<ICarData>('Car', carSchema);