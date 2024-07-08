import { BadRequestError, TokenService } from "tune-up-library";
import { IConfigService } from "../repositories/interfaces/validateCredintials";

export class RegisterUseCase {
  constructor(
    private configService:IConfigService
  ) {}

  async execute(email: string, password: string): Promise<any> {

    const isVerified = this.configService.validateCredentials(email,password)
    
    if (!isVerified) {
      throw new BadRequestError('Invalid email or password')
    }

    const token = TokenService.generateToken({
      user: "admin",
      role: "company",
    });

    return {success:true,token:token}

  }
}
