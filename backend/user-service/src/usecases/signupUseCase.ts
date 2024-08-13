import { BadRequestError } from "tune-up-library";
import { User } from "../entities/userEntity";
import { IRedisRepository,IUserRepository } from "../repositories";
import { OtpService} from "../infrastructure/services";
import { hashPassword } from '../utils';


export class SignupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: OtpService,
    private redisRepository:IRedisRepository
  ) {}

  async execute(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    if (!username || !email || !password) {
      throw new BadRequestError("Invalid input");
    }

    const existingEmail = await this.userRepository.findByEmail(email);

    if (existingEmail) {
      throw new BadRequestError("User Email already registered");
    }
    const hashedPassword = await hashPassword(password);

    const user = new User({ username, email, phone:null, password:hashedPassword });

    const otp = this.otpRepository.generateOtp(4);    

    const subject = 'Your OTP Code';
    const message = `Your OTP code is ${otp}`;
    await this.otpRepository.sendMail(email,subject,message);
    await this.redisRepository.store(email,otp,300);

    return await this.userRepository.save(user);
  }
}
