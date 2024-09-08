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
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
