import express from "express";
import userRoute from "./infrastructure/express/routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { setupServer } from "./infrastructure/socketService/socketServer";
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
app.use(cookieParser());
app.use("/api/chat", userRoute);

setupServer(app, PORT);
