// import { BadRequestError } from "tune-up-library";
// import { IUserRepository, IRedisRepository } from "../repositories/interfaces";
// import { hashPassword } from '../utils';

// export class ResetPasswordUseCase {
//   constructor(
//     private userRepository: IUserRepository,
//     private redisRepository: IRedisRepository
//   ) {}

//   async resetPassword(token: string, newPassword: string): Promise<void> {
//     if (!token || !newPassword) {
//       throw new BadRequestError("Invalid input");
//     }

//     const email = await this.redisRepository.getOtp(token);
//     if (!email) {
//       throw new BadRequestError("Invalid or expired token");
//     }

//     const hashedPassword = await hashPassword(newPassword);
//     await this.userRepository.updatePassword(email, hashedPassword);

//     await this.redisRepository.deleteToken(token);
//   }
// }
