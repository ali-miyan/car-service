import { Schema, model, Document } from "mongoose";

export interface RatingDocument extends Document {
  serviceId: string;
  userId: string;
  username: string;
  email: string;
  profileImg: string;
  stars: number;
  review: string;
  likes: number;
  dislikes: number;
}

const ratingSchema = new Schema<RatingDocument>(
  {
    serviceId: { type: String, required: true },  
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String, required: true },
    stars: { type: Number, required: true },
    review: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default model<RatingDocument>("Rating", ratingSchema);
