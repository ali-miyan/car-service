import express from "express";
import userRoute from "./infrastructure/express/routes";
import {connectDB} from "./infrastructure/db";
import { errorHandler } from 'tune-up-library'
import cookieParser from 'cookie-parser';
require('dotenv').config()

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoute);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
