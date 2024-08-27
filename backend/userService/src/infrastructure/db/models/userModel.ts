import { Schema, model, Document } from "mongoose";

export interface IWalletHistory {
  transactionType: "credit" | "debit";
  amount: number;
  date: Date;
}

export interface IUserData extends Document {
  username: string;
  email: string;
  phone: number | null;
  profileImg: string | null;
  password: string;
  isBlocked: boolean;
  wallet: number;
  walletHistory: IWalletHistory[];
}

const userSchema = new Schema<IUserData>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, default: null },
    profileImg: { type: String, default: null },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    wallet: { type: Number, default: 0 },
    walletHistory: [
      {
        transactionType: {
          type: String,
          enum: ["credit", "debit"],
          required: true,
        },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IUserData>("User", userSchema);
