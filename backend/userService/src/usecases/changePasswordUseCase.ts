import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";
import { hashPassword, verifyPassword } from "../utils";

export class UpdatePasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise<any> {
    try {
      if (!userId || !currentPassword || !newPassword || !confirmNewPassword) {
        throw new BadRequestError("All fields are required.");
      }

      if (newPassword !== confirmNewPassword) {
        throw new BadRequestError("New passwords do not match.");
      }

      const user = await this.userRepository.getById(userId);
      if (!user) {
        throw new BadRequestError("User not found.");
      }

      const isPasswordValid = await verifyPassword(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        throw new BadRequestError("Current password is incorrect.");
      }

      const hashedPassword = await hashPassword(newPassword);

      user.password = hashedPassword;
      await this.userRepository.save(user);

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
