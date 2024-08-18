import { BadRequestError, NotFoundError } from "tune-up-library";
import { IChatRepository } from "../repositories";
import { Chat } from "../entities";

export class SaveChatUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(
    senderId: string,
    senderName: string,
    senderImg: string,
    recieverId: string,
    content: string,
    timestamp: number,
    chatId?: string
  ): Promise<void> {
    try {
      let chat: Chat | null = null;

      if (chatId) {
        chat = await this.chatRepository.getOneChat(chatId);
        if (!chat) {
          throw new NotFoundError("Chat not found");
        }

        if (!chat.company.companyImg || !chat.company.companyName) {
          chat.company = {
            companyId: senderId,
            companyImg: senderImg,
            companyName: senderName,
          };
        }

        chat.messages.push({
          sender: senderId,
          content,
          timestamp: new Date(timestamp),
          type: "text",
        });
        await this.chatRepository.update(chat);
      } else {
        const existingChat = await this.chatRepository.findByUserAndCompany(
          senderId,
          recieverId
        );

        if (existingChat) {
          existingChat.messages.push({
            sender: senderId,
            content,
            timestamp: new Date(timestamp),
            type: "text",
          });
          await this.chatRepository.update(existingChat);
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
                content,
                timestamp: new Date(timestamp),
                type: "text",
              },
            ],
          });
          await this.chatRepository.save(newChat);
        }
      }

      console.log("final chat", chat);
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Error in database operation");
    }
  }
}
