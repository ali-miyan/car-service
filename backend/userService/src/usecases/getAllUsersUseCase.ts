import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<any> {
    try {
      const monthlyUsers = await this.userRepository.getMonthlyUsers();
      const users = await this.userRepository.getAllUsersCount();

      return {
        monthlyUsers,
        users,
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
