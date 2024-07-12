import { BadRequestError, TokenService } from "tune-up-library";
import { ConfigService } from "../infrastructure/services";

export class RegisterUseCase {
  constructor(
    private configService:ConfigService
  ) {}

  async execute(email: string, password: string): Promise<any> {

    const isVerified = this.configService.validateCredentials(email,password)
    
    if (!isVerified) {
      throw new BadRequestError('Invalid email or password')
    }

    const token = TokenService.generateToken({
      user: "admin",
      role: "admin",
    });
    const refreshToken = TokenService.generateRefreshToken({
      user: "admin",
      role: "admin",
    });

    return {success:true,token,refreshToken}

  }
}
