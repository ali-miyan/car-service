// src/infrastructure/db/UserModel.ts

import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
    username: string;
    email: string;
    phone: string;
    password: string;
}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
});

export default model<UserDocument>('User', userSchema);
