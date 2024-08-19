import { Server } from "socket.io";
import { SaveChatUseCase, SaveBookedUsersChatUseCase } from "../../usecases";
import { ChatRepository } from "../../repositories";
import { connectDB } from "../db";
import { ChatServer } from "./chatServer";

export const setupServer = async (app: any, port: number) => {
  const server = require("http").createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const chatRepository = new ChatRepository();
  const saveChatUseCase = new SaveChatUseCase(chatRepository);
  const saveBookedUsersChatUseCase = new SaveBookedUsersChatUseCase(
    chatRepository
  );

  new ChatServer(io, saveChatUseCase, saveBookedUsersChatUseCase);

  await connectDB();

  server.listen(port, () => {
    console.log(`chat server is running on port ${port}`);
  });

  return server;
};
