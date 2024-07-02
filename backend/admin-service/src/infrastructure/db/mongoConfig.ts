import mongoose from "mongoose";
require('dotenv').config()

const mongoURI = process.env.MONGO_URI as string;
console.log(mongoURI);


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
