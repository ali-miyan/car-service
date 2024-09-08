import { BadRequestError, TokenService } from "tune-up-library";
import { OtpService } from "../infrastructure/services";
import { IRedisRepository, IUserRepository } from "../repositories/interfaces";
require("dotenv").config();

export class RequestPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private redisRepository: IRedisRepository,
    private otpRepository: OtpService
  ) {}

  async execute(email: string): Promise<{}> {
    try {
      if (!email) {
        throw new BadRequestError("Email is required");
      }

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new BadRequestError("User not found");
      }

      const token = TokenService.generateToken({
        user: email,
        role: "resetpassword",
      });

      await this.redisRepository.store(token, email, 3600);

      const resetLink = process.env.CLIENT_URL + "/reset-password/" + token;
      await this.otpRepository.sendMail(
        email,
        "Password Reset",
        "Reset your password using this link: " + resetLink
      );

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
