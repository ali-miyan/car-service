import { BadRequestError, TokenService } from "tune-up-library";
import { IUserRepository } from "../repositories";
import { getUserFromGoogle } from "../utils/googleUser";

export class GoogleUseCase {
  constructor(private googleRepositry: IUserRepository) {}

  async execute(access_token: string, token_type: string): Promise<any> {
    if (!access_token || !access_token) {
      throw new BadRequestError("Failed to fetch");
    }

    const { name, email, id } = await getUserFromGoogle(access_token,token_type);
    console.log(name, email);

    const user = await this.googleRepositry.findByEmail(email);

    if (!user) {
      await this.googleRepositry.save({
        username: name,
        email,
        phone: null,
        password: id,
      });
    }
    const token = TokenService.generateToken({
      user: name,
      role: 'user',
    });
    const refreshToken = TokenService.generateRefreshToken({
      user:name,
      role:'user'
    });

    return { success: true, token,refreshToken };
  }
}
