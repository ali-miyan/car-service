import express from "express";
import bookingRoute from "./infrastructure/express/routes";
import { connectDB, sequelize } from "./infrastructure/db";
import { errorHandler } from "tune-up-library";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import setupSocketServer from "./infrastructure/services/socketService";
import { createConsumerService } from "./infrastructure/rabbitMQ/rabbitMQServices";
import { startUsersGrpcServer } from "./infrastructure/grpc/grpcServices";
import Booking from "./infrastructure/db/models/bookingModel";
import { createKafkaConsumer, KafkaService } from "./infrastructure/kafka";

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
app.use(express.raw({ type: '*/*'}))
app.use("/api/order", bookingRoute);
app.use(errorHandler);


const server = http.createServer(app);
const io = setupSocketServer(server);

const startServer = async () => {
  try {
    await connectDB();
    await (createKafkaConsumer()).startConsuming();
    startUsersGrpcServer()
    createConsumerService();
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
