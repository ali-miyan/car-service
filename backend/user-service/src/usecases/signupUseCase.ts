import { BadRequestError } from "tune-up-library";
import { User } from "../entities/userEntity";
import { IOtpService,IRedisRepository,IUserRepository } from "../repositories/interfaces";
import { hashPassword } from '../utils';


export class SignupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: IOtpService,
    private redisRepository:IRedisRepository
  ) {}

  async execute(
    username: string,
    email: string,
    phone: number,
    password: string
  ): Promise<User> {
    if (!username || !email || !password) {
      throw new BadRequestError("Invalid input");
    }

    const existingEmail = await this.userRepository.findByEmail(email);

    if (existingEmail) {
      throw new BadRequestError("User Email already registered");
    }

    const existingPhone = await this.userRepository.findByPhone(phone);

    if (existingPhone) {
      throw new BadRequestError("User Phone is already registered");
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({ username, email, phone, password:hashedPassword });

    const otp = this.otpRepository.generateOtp(4)

    const subject = 'Your OTP Code';
    const message = `Your OTP code is ${otp}`;
    await this.otpRepository.sendMail(email,subject,message);
    await this.redisRepository.storeOtp(email,otp,300);

    return await this.userRepository.save(user);
  }
}
