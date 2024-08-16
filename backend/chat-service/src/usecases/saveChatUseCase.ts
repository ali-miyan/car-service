import { BadRequestError, NotFoundError } from "tune-up-library";
import { IChatRepository } from "../repositories";
import { Chat } from "../entities";

export class SaveChatUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(
    userId: string,
    username: string,
    userImg: string,
    companyId: string,
    content: string,
    timestamp: number
  ): Promise<void> {
    try {
      const existingChat = await this.chatRepository.findByUserAndCompany(
        userId,
        companyId
      );

      if (existingChat) {
        existingChat.messages.push({
          sender: userId,
          content,
          timestamp: new Date(timestamp),
          type: "text",
        });
        await this.chatRepository.update(existingChat);
      } else {
        const newChat = new Chat({
          user: { userId, userImg, username },
          company: { companyId },
          messages: [
            {
              sender: userId,
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
      throw new BadRequestError("error in db");
    }
  }
}
