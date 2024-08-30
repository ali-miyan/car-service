import express from "express";
import bookingRoute from "./infrastructure/express/routes";
import { errorHandler } from "tune-up-library";
import cookieParser from "cookie-parser";
import http from "http";
import setupSocketServer from "./infrastructure/services/socketService";
import { initializeServices } from "./infrastructure";

const PORT = 3003;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/order", bookingRoute);
app.use(errorHandler);

const server = http.createServer(app);
const io = setupSocketServer(server);

const startServer = async () => {
  try {
    await initializeServices()
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
