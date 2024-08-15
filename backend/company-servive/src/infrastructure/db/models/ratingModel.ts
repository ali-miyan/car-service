import { Schema, model, Document } from "mongoose";

export interface RatingDocument extends Document {
  serviceId: string;
  userId: string;
  username: string;
  email: string;
  profileImg: string;
  stars: number;
  review: string;
  likes: {
    count: number;
    userIds: string[];
  };
  dislikes: {
    count: number;
    userIds: string[];
  };
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
    likes: {
      count: { type: Number, default: 0 },
      userIds: { type: [String], default: [] },
    },
    dislikes: {
      count: { type: Number, default: 0 },
      userIds: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

export default model<RatingDocument>("Rating", ratingSchema);
