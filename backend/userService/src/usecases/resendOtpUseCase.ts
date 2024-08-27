import { BadRequestError } from "tune-up-library";
import { IRedisRepository } from "../repositories";
import { OtpService } from "../infrastructure/services";


export class ResendOtpUseCase {
  constructor(
    private otpRepository: OtpService,
    private redisRepository:IRedisRepository
  ) {}

  async execute(
    email: string,
  ): Promise<void> {
    if (!email) {
      throw new BadRequestError("Invalid input");
    }

    const otp = this.otpRepository.generateOtp(4);

    const subject = 'Your OTP Code';
    const message = `Your OTP code is ${otp}`;
    await this.otpRepository.sendMail(email,subject,message);
    
    await this.redisRepository.store(email,otp,300);

  }
}
