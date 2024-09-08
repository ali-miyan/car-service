import { BadRequestError } from "tune-up-library";
import { IChatRepository } from "../repositories";

export class EditUserUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(userDetails: any): Promise<any> {
    try {
      const { userId, username, profileImg } = userDetails;
      await this.chatRepository.editUser(userId, username, profileImg);
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
