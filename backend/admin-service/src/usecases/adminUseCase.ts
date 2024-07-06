import { BadRequestError } from "tune-up-library";
import { Admin } from "../entities/adminEntity";
import { IConfigService } from "../repositories/interfaces/validateCredintials";

export class RegisterUseCase {
  constructor(
    private configService:IConfigService
  ) {}

  async execute(email: string, password: string): Promise<boolean> {

    const isVerified = this.configService.validateCredentials(email,password)
    
    if (!isVerified) {
      throw new BadRequestError('Invalid email or password')
    }

    const admin = new Admin({
      email,
      password,
    });

    return true

  }
}
