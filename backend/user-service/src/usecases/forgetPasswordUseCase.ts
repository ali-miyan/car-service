// import { BadRequestError } from "tune-up-library";
// import { IUserRepository, IRedisRepository, IOtpService } from "../repositories/interfaces";
// import crypto from 'crypto';

// export class ForgotPasswordUseCase {
//   constructor(
//     private userRepository: IUserRepository,
//     private redisRepository: IRedisRepository,
//     private otpRepository: IOtpService,
//   ) {}

//   async execute(email: string): Promise<void> {
//     if (!email) {
//       throw new BadRequestError("Email is required");
//     }

//     const user = await this.userRepository.findByEmail(email);
//     if (!user) {
//       throw new BadRequestError("User not found");
//     }

//     const token = this.otpRepository.generateToken();
//     await this.redisRepository.storeOtp(token,email, 3600); 

//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
//     await this.otpRepository.sendMail(email, "Password Reset", `Reset your password using this link: ${resetLink}`);


//   }
// }
