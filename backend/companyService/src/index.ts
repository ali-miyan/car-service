import express from "express";
import compnayRoute from "./infrastructure/express/routes";
import { connectDB } from "./infrastructure/db/mongoConfig";
import { errorHandler } from "tune-up-library";
import cookieParser from "cookie-parser";
import { initializeGrpcServices } from "./infrastructure";

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/company", compnayRoute);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  initializeGrpcServices();
  app.listen(PORT, () => {
    console.log(`company server is running on port ${PORT}`);
  });
};

startServer();
