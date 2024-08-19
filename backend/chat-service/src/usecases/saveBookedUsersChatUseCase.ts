import { BadRequestError, NotFoundError } from "tune-up-library";
import { IChatRepository } from "../repositories";
import { Chat } from "../entities";

export class SaveBookedUsersChatUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(
    senderId: string,
    senderName: string,
    senderImg: string,
    recieverId: string,
    content: string,
    timestamp: number
  ): Promise<void> {
    try {
      const existingChat = await this.chatRepository.findByUserAndCompany(
          recieverId,
          senderId
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
            userId: recieverId,
          },
          company: {
            companyId: senderId,
            companyImg: senderImg,
            companyName: senderName,
          },
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
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Error in database operation");
    }
  }
}
