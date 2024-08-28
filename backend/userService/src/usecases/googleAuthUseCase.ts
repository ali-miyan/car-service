import { BadRequestError, TokenService } from "tune-up-library";
import { IUserRepository } from "../repositories";
import { getUserFromGoogle } from "../utils/googleUser";

export class GoogleUseCase {
  constructor(private googleRepositry: IUserRepository) {}

  async execute(access_token: string, token_type: string): Promise<any> {
    if (!access_token || !access_token) {
      throw new BadRequestError("Failed to fetch");
    }

    const { name, email, id } = await getUserFromGoogle(
      access_token,
      token_type
    );

    let user: any = await this.googleRepositry.findByEmail(email);

    if (!user) {
      user = await this.googleRepositry.save({
        username: name,
        email,
        phone: null,
        password: id,
        wallet: 0,
      });
    }

    if (user.isBlocked) {
      throw new BadRequestError("User is Blocked");
    }

    const token = TokenService.generateToken({
      user: (user._id as string) || id,
      role: "user",
    });
    const refreshToken = TokenService.generateRefreshToken({
      user: (user._id as string) || id,
      role: "user",
    });

    return { success: true, token, refreshToken };
  }
}
