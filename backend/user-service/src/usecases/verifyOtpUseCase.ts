import { IRedisRepository } from "../repositories/interfaces/redisInterface";

export class VerifyOtpUseCase {
  constructor(private verfyOtpRepository: IRedisRepository) {}

  async execute(otp: string, email: string): Promise<{}> {
    if (!otp) {
      throw new Error("Invalid input");
    }

    const userOtp = await this.verfyOtpRepository.getOtp(email);

    if(userOtp !== otp){
        throw new Error("invalid Otp")
    }

    await this.verfyOtpRepository.deleteOtp(email)

    return { success: true };
  }
}
