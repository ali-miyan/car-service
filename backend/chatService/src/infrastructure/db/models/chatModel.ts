import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  sender: Schema.Types.ObjectId;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
}

export interface IUserDetails {
  userId: Schema.Types.ObjectId;
  username?: string;
  userImg?: string;
}

export interface ICompanyDetails {
  companyId: Schema.Types.ObjectId;
  companyName?: string;
  companyImg?: string;
}

export interface IChat extends Document {
  user: IUserDetails;
  company: ICompanyDetails;
  messages: IMessage[];
}

const chatSchema = new Schema<IChat>({
  user: {
    userId: { type: Schema.Types.ObjectId, required: true },
    username: { type: String },
    userImg: { type: String },
  },
  company: {
    companyId: { type: Schema.Types.ObjectId, required: true },
    companyName: { type: String },
    companyImg: { type: String },
  },
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      type: { type: String, enum: ["text", "image", "file"], default: "text" },
    },
  ],
});

chatSchema.virtual("senderType").get(function (this: IChat) {
  const lastMessage = this.messages[this.messages.length - 1];
  if (!lastMessage) return null;

  const isUser = this.user.userId.toString() === lastMessage.sender.toString();
  return isUser ? "User" : "Company";
});

export const ChatModel = mongoose.model<IChat>("Chat", chatSchema);
