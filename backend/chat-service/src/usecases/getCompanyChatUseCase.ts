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


      return chat;
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }
}
