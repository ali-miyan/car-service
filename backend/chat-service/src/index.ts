import express from "express";
import userRoute from "./infrastructure/express/routes";
import { connectDB } from "./infrastructure/db";
import { Server } from "socket.io";
import { ChatServer } from "./infrastructure/socketService";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import { SaveChatUseCase } from "./usecases";
import { ChatRepository } from "./repositories";
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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials:true
  },
});

const chatRepository = new ChatRepository()
const saveChatUseCase = new SaveChatUseCase(chatRepository);
new ChatServer(io,saveChatUseCase);

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
