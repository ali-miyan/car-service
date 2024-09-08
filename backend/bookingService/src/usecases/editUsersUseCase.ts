import { BadRequestError } from "tune-up-library";
import { IUserInterface } from "../repositories";

export class EditUserUseCase {
  constructor(private userRepository: IUserInterface) {}

  async execute(userDetails: any): Promise<any> {
    try {
      const { userId, username, phone, profileImg } = userDetails;

      await this.userRepository.editUser(userId, username, phone, profileImg);
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
