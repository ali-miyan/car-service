import { Server } from "socket.io";
import { SaveChatUseCase, SaveBookedUsersChatUseCase } from "../../usecases";
import { ChatRepository } from "../../repositories";
import { connectDB } from "../db";
import { ChatServer } from "./chatServer";
import { createKafkaConsumer } from "../kafka";
import { S3Service } from "../services";
import { BadRequestError } from "tune-up-library";
const s3Service = new S3Service();

export const  setupServer = async (app: any, port: number) => {
  try {
    const server = require("http").createServer(app);

    const io = new Server(server, {
      path: "/api/chat/socket.io",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
      allowEIO3: true,
    });

    const chatRepository = new ChatRepository();
    const saveChatUseCase = new SaveChatUseCase(chatRepository, s3Service);
    const saveBookedUsersChatUseCase = new SaveBookedUsersChatUseCase(
      chatRepository
    );
    await createKafkaConsumer().startConsuming();

    new ChatServer(io, saveChatUseCase, saveBookedUsersChatUseCase);

    await connectDB();

    server.listen(port, "0.0.0.0", () => {
      console.log(`chat server is running on port ${port}`);
    });

    return server;
  } catch (error) {
    throw new BadRequestError("error while staring" + error);
  }
};
