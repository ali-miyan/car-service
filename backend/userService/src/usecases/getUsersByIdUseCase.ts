import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<any> {
    try {
      const data = await this.userRepository.getById(id);
      if (!data) {
        throw new BadRequestError("User not found.");
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
