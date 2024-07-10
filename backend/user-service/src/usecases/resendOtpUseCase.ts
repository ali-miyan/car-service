import { BadRequestError } from "tune-up-library";
import { IOtpService,IRedisRepository } from "../repositories/interfaces";


export class ResendOtpUseCase {
  constructor(
    private otpRepository: IOtpService,
    private redisRepository:IRedisRepository
  ) {}

  async execute(
    email: string,
  ): Promise<void> {
    if (!email) {
      throw new BadRequestError("Invalid input");
    }

    const otp = this.otpRepository.generateOtp(4);

    await this.otpRepository.sendOtp(email,otp);
    
    await this.redisRepository.storeOtp(email,otp,300);

  }
}
