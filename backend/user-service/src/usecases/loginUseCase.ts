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
    if (user.isBlocked) {
      throw new BadRequestError("User is Blocked");
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError("invalid password");
    }

    const token = TokenService.generateToken({
      user: (user._id as string),
      role: "user",
    });
    const refreshToken = TokenService.generateRefreshToken({
      user: (user._id as string),
      role: "user",
    });


    return { success: true, token, refreshToken };
  }
}
