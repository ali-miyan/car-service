import { BadRequestError, NotFoundError } from "tune-up-library";
import { IChatRepository } from "../repositories";

export class GetCompanyChatUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(companyId: string): Promise<any> {
    try {
      if (!companyId) {
        throw new BadRequestError("invalid input");
      }

      const chat: any = await this.chatRepository.getById(companyId);

      return chat.length > 0 ? chat : null;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
