import { ICompanyRepository } from "../repositories/interfaces";
import { BadRequestError, TokenService } from "tune-up-library";
import { verifyPassword } from "../utils/bcrypt";

export class LoginUseCase {
  constructor(private companyRepository: ICompanyRepository) {}

  async execute(email: string, password: string): Promise<any> {
    const company = await this.companyRepository.find(email);

    if (!company) {
      throw new BadRequestError("user not found");
    }

    const isPasswordValid = await verifyPassword(password, company.password);

    if (!isPasswordValid) {
      throw new BadRequestError("invalid password");
    }

    const token = TokenService.generateToken({
      user: company.ownerName,
      role: "company",
    });
    const refreshToken = TokenService.generateRefreshToken({
      user: company.ownerName,
      role: "company",
    });

    return { success: true, token, refreshToken };
  }
}
