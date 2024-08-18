import { BadRequestError, NotFoundError } from "tune-up-library";
import { IChatRepository } from "../repositories";

export class GetChatUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(userId: string, companyId: string): Promise<any> {
    try {
      if (!userId || !companyId) {
        throw new BadRequestError("invalid input");
      }

      const chat = await this.chatRepository.findByUserAndCompany(
        userId,
        companyId
      );

      return chat;
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }
}
