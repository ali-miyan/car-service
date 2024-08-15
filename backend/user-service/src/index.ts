import express from "express";
import userRoute from "./infrastructure/express/routes";
import { connectDB } from "./infrastructure/db";
import { errorHandler } from "tune-up-library";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { createConsumerService } from "./infrastructure/rabbitMQ";
import { setupSocketServer } from "./infrastructure/services";
require("dotenv").config();

const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use(errorHandler);

const server = http.createServer(app);
const io = setupSocketServer(server);

const startServer = async () => {
  try {
    await connectDB();
    createConsumerService();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
export { io };
