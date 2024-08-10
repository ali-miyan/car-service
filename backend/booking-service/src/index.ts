import express from "express";
import bookingRoute from "./infrastructure/express/routes";
import { connectDB } from "./infrastructure/db";
import { errorHandler } from "tune-up-library";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import setupSocketServer from "./infrastructure/services/socketService";
import { createConsumerService } from "./infrastructure/rabbitMQ/rabbitMQServices";

const PORT = 3003;

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/order", bookingRoute);
app.use(errorHandler);

const server = http.createServer(app);
const io = setupSocketServer(server);

const startServer = async () => {
  try {
    // createConsumerService()
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
export { io };
