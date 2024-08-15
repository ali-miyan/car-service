import express from "express";
import userRoute from "./infrastructure/express/routes";
import { connectDB } from "./infrastructure/db";
import cors from "cors";
import http from "http";
require("dotenv").config();

const PORT = 3004;

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/chat", userRoute);

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();