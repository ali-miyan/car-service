import { Server, Socket } from "socket.io";
import { SaveChatUseCase, SaveBookedUsersChatUseCase } from "../../usecases";

export class ChatServer {
  private io: Server;
  private saveChatUseCase: SaveChatUseCase;
  private saveBookedUsersChatUseCase: SaveBookedUsersChatUseCase;

  constructor(
    io: Server,
    saveChatUseCase: SaveChatUseCase,
    saveBookedUsersChatUseCase: SaveBookedUsersChatUseCase
  ) {
    this.io = io;
    this.saveChatUseCase = saveChatUseCase;
    this.saveBookedUsersChatUseCase = saveBookedUsersChatUseCase;
    this.initializeSocket();
  }

  private initializeSocket() {
    this.io.on("connection", (socket: Socket) => {
      console.log("New client connected:", socket.id);

      socket.on("user_message_sent", async (messageData: any) => {
        const {
          userId,
          username,
          userImg,
          companyId,
          content,
          timestamp,
          type,
        } = messageData;

        console.log(messageData,'got the whole details');
        

        this.io.emit("user_to_company", {
          userId,
          username,
          userImg,
          content,
          timestamp,
          type,
        });
        await this.saveChatUseCase.execute(
          userId,
          username,
          userImg,
          companyId,
          content,
          timestamp,
          type
        );
      });

      socket.on("company_message_sent", async (messageData: any) => {
        const {
          chatId,
          companyId,
          companyName,
          companyImg,
          userId,
          content,
          timestamp,
          type,
        } = messageData;

        this.io.emit("company_to_user", {
          companyId,
          companyName,
          companyImg,
          content,
          timestamp,
          type,
        });
        
        if (chatId) {
          await this.saveChatUseCase.execute(
            companyId,
            companyName,
            companyImg,
            userId,
            content,
            timestamp,
            type,
            chatId
          );
        } else {
          await this.saveBookedUsersChatUseCase.execute(
            companyId,
            companyName,
            companyImg,
            userId,
            content,
            timestamp
          );
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }
}
