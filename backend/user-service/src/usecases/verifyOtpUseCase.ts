import { BadRequestError, TokenService } from "tune-up-library";
import { IRedisRepository, IUserRepository } from "../repositories/interfaces";

export class VerifyOtpUseCase {
  constructor(
    private verifyOtpRepository: IRedisRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(otp: string, email: string): Promise<{}> {
    if (!otp) {
      throw new BadRequestError("Invalid input");
    }

    const userOtp = await this.verifyOtpRepository.getOtp(email);

    if (userOtp !== otp) {
      throw new BadRequestError("invalid Otp");
    }
    await this.verifyOtpRepository.deleteOtp(email);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const token = TokenService.generateToken({
      username: user.username,
      email: user.email,
    });

    return { success: true, token: token };
  }
}
