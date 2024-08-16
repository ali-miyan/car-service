import { Server, Socket } from "socket.io";
import { SaveChatUseCase } from "../../usecases";

export class ChatServer {
  private io: Server;
  private saveChatUseCase: SaveChatUseCase;

  constructor(io: Server, saveChatUseCase: SaveChatUseCase) {
    this.io = io;
    this.saveChatUseCase = saveChatUseCase;
    this.initializeSocket();
  }

  private initializeSocket() {
    this.io.on("connection", (socket: Socket) => {
      console.log("New client connected:", socket.id);

      socket.on("user_message_sent", async (messageData: any) => {
        console.log(messageData, "messagedata");

        const { userId, username, userImg, companyId, content, timestamp } = messageData;

        await this.saveChatUseCase.execute(userId, username, userImg, companyId, content, timestamp);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }
}
