import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<any> {
    try {
      const data = await this.userRepository.getAll();
      if (!data) {
        throw new BadRequestError("No users found.");
      }
      return data;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
