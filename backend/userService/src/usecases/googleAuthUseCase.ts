import { BadRequestError, TokenService } from "tune-up-library";
import { IUserRepository } from "../repositories";
import { getUserFromGoogle } from "../utils/googleUser";

export class GoogleUseCase {
  constructor(private googleRepositry: IUserRepository) {}

  async execute(access_token: string, token_type: string): Promise<any> {
    try {
      if (!access_token || !token_type) {
        throw new BadRequestError("Access token or token type is missing.");
      }

      const { name, email, id, picture } = await getUserFromGoogle(
        access_token,
        token_type
      );

      let user: any = await this.googleRepositry.findByEmail(email);

      if (!user) {
        user = await this.googleRepositry.save({
          username: name,
          email,
          phone: null,
          profileImg: picture,
          password: id,
          wallet: 0,
        });
      }

      if (user.isBlocked) {
        throw new BadRequestError("User is blocked.");
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
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
