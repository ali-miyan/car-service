import { ICompanyRepository } from "../repositories/interfaces";
import { BadRequestError, TokenService } from "tune-up-library";
import { verifyPassword } from "../utils/bcrypt";

export class LoginUseCase {
  constructor(private companyRepository: ICompanyRepository) {}

  async execute(email: string, password: string): Promise<any> {
    try {
      const company = await this.companyRepository.find(email);

      if (!company) {
        throw new BadRequestError("User not found");
      }

      if (company.isBlocked) {
        throw new BadRequestError("You have been blocked");
      }

      if (company.isApproved === "declined") {
        throw new BadRequestError("Your request has been declined");
      } else if (company.isApproved === "pending") {
        throw new BadRequestError("Please wait for the admin's approval");
      }

      const isPasswordValid = await verifyPassword(password, company.password);

      if (!isPasswordValid) {
        throw new BadRequestError("Invalid password");
      }

      const token = TokenService.generateToken({
        user: company._id as string,
        role: "company",
      });
      const refreshToken = TokenService.generateRefreshToken({
        user: company._id as string,
        role: "company",
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
