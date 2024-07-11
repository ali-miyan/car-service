import { BadRequestError, TokenService } from "tune-up-library";
import { IRedisRepository, IUserRepository } from "../repositories";

export class VerifyOtpUseCase {
  constructor(
    private verifyOtpRepository: IRedisRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(otp: string, email: string): Promise<any> {
    if (!otp) {
      throw new BadRequestError("Invalid input");
    }

    const userOtp = await this.verifyOtpRepository.get(email);

    if (userOtp !== otp) {
      throw new BadRequestError("invalid Otp");
    }
    await this.verifyOtpRepository.delete(email);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const token = TokenService.generateToken({
      user: user.username,
      role: 'user',
    });

    const refreshToken = TokenService.generateRefreshToken({
      user:user.username,
      role:'user'
    });

    return { success: true, token, refreshToken };
  } 
}
