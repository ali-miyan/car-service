import { BadRequestError, TokenService } from "tune-up-library";
import { IRedisRepository, IUserRepository } from "../repositories";
import { hashPassword } from "../utils";
import { User } from "../entities";

export class VerifyOtpUseCase {
  constructor(
    private verifyOtpRepository: IRedisRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(
    otp: string,
    email: string,
    username: string,
    password: string
  ): Promise<any> {
    if (!otp) {
      throw new BadRequestError("Invalid input");
    }

    const userOtp = await this.verifyOtpRepository.get(email);

    if (userOtp !== otp) {
      throw new BadRequestError("invalid Otp");
    }
    await this.verifyOtpRepository.delete(email);

    const hashedPassword = await hashPassword(password);

    const user = new User({
      username,
      email,
      phone: null,
      password: hashedPassword,
      wallet: 0,
    });

    const userData = await this.userRepository.save(user);

    const token = TokenService.generateToken({
      user: userData._id as string,
      role: "user",
    });

    const refreshToken = TokenService.generateRefreshToken({
      user: userData._id as string,
      role: "user",
    });

    return { success: true, token, refreshToken };
  }
}
