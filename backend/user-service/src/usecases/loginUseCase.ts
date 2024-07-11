import { BadRequestError, TokenService } from "tune-up-library";
import { IUserRepository } from "../repositories";
import { verifyPassword } from "../utils";

export class LoginUseCase {
  constructor(private loginRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new BadRequestError("Invalid input");
    }

    const user = await this.loginRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      
      throw new BadRequestError("invalid password")
    }

    const token = TokenService.generateToken({
      user:user.username,
      role:'user'
    });

    console.log(token,'token');
    

    return { success: true ,token:token };
  }
}
