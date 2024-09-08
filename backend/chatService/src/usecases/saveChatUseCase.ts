import { BadRequestError, NotFoundError } from "tune-up-library";
import { IChatRepository } from "../repositories";
import { Chat } from "../entities";
import { S3Service } from "../infrastructure/services";
import { randomUUID } from "crypto";

export class SaveChatUseCase {
  constructor(
    private chatRepository: IChatRepository,
    private s3Service: S3Service
  ) {}

  async execute(
    senderId: string,
    senderName: string,
    senderImg: string,
    recieverId: string,
    content: string | Buffer,
    timestamp: number,
    type: "text" | "file",
    chatId?: string
  ): Promise<void> {
    try {
      let chat: Chat | null = null;
      let contentType: string;

      if (type === "file") {
        contentType = await this.s3Service.uploadFile(
          "tune-up",
          randomUUID(),
          content as Buffer,
          "image/png"
        );
        console.log(contentType, "got from aws");
      } else {
        contentType = content as string;
      }

      if (chatId) {
        chat = await this.chatRepository.getOneChat(chatId);
        console.log(chat, null);

        if (!chat) {
          throw new BadRequestError("no chat found");
        } else {
          if (!chat.company.companyImg || !chat.company.companyName) {
            chat.company = {
              companyId: senderId,
              companyImg: senderImg,
              companyName: senderName,
            };
          }

          chat.messages.push({
            sender: senderId,
            content: contentType,
            timestamp: new Date(timestamp),
            type,
          });
          await this.chatRepository.update(chat);
        }
      } else {
        const existingChat = await this.chatRepository.findByUserAndCompany(
          senderId,
          recieverId
        );

        if (existingChat) {
          existingChat.messages.push({
            sender: senderId as any,
            content: contentType,
            timestamp: new Date(timestamp),
            type,
          });
          await this.chatRepository.update(existingChat as unknown as Chat);
        } else {
          const newChat = new Chat({
            user: {
              userId: senderId,
              userImg: senderImg,
              username: senderName,
            },
            company: { companyId: recieverId },
            messages: [
              {
                sender: senderId,
                content: contentType,
                timestamp: new Date(timestamp),
                type,
              },
            ],
          });
          await this.chatRepository.save(newChat);
        }
      }
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
