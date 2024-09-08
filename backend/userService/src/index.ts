import express from "express";
import userRoute from "./infrastructure/express/routes";
import { connectDB } from "./infrastructure/db";
import { errorHandler } from "tune-up-library";
import cookieParser from "cookie-parser";
import http from "http";
import {
  initializeServices,
  setupSocketServer,
  shutdownServices,
} from "./infrastructure";
require("dotenv").config();

const PORT = 3000;

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use(errorHandler);

const server = http.createServer(app);
const io = setupSocketServer(server);

const startServer = async () => {
  try {
    await initializeServices();
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    await shutdownServices();
    process.exit(1);
  }
};

startServer();
export { io };
