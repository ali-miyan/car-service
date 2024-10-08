import { BadRequestError } from "tune-up-library";
import { IRedisRepository, IUserRepository } from "../repositories";
import { OtpService } from "../infrastructure/services";

export class SignupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: OtpService,
    private redisRepository: IRedisRepository
  ) {}

  async execute(email: string): Promise<any> {
    try {
      if (!email) {
        throw new BadRequestError("Invalid input");
      }

      const existingEmail = await this.userRepository.findByEmail(email);

      if (existingEmail) {
        throw new BadRequestError("User Email already registered");
      }

      const otp = this.otpRepository.generateOtp(4);

      const subject = "Your OTP Code";
      const message = "Your OTP code is " + otp;
      await this.otpRepository.sendMail(email, subject, message);
      await this.redisRepository.store(email, otp, 300);

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
