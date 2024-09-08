import { BadRequestError } from "tune-up-library";
import { IUserRepository, IRedisRepository } from "../repositories";
import { hashPassword } from "../utils";

export class ResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private redisRepository: IRedisRepository
  ) {}

  async execute(token: string, newPassword: string): Promise<{}> {
    try {
      if (!token || !newPassword) {
        throw new BadRequestError("Invalid input");
      }

      const email = await this.redisRepository.get(token);

      if (!email) {
        throw new BadRequestError("Invalid or expired token");
      }

      const hashedPassword = await hashPassword(newPassword);

      await this.userRepository.updatePassword(email, hashedPassword);

      await this.redisRepository.delete(token);

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
