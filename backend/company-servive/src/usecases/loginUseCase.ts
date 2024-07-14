import { ICompanyRepository } from "../repositories/interfaces";
import { BadRequestError, TokenService } from "tune-up-library";
import { verifyPassword } from "../utils/bcrypt";

export class LoginUseCase {
  constructor(private companyRepository: ICompanyRepository) {}

  async execute(email: string, password: string): Promise<any> {
    const company = await this.companyRepository.find(email);

    console.log(company,'comapeny');
    

    if (!company) {
      throw new BadRequestError("user not found");
    }

    if(company.isBlocked){
      throw new BadRequestError("you have been blocked");
    }
    if(company.isApproved === 'declined'){
      throw new BadRequestError("you request has been declined");
    } else if(company.isApproved === "pending"){
      throw new BadRequestError("please wait for the admins approvel");
    }

    const isPasswordValid = await verifyPassword(password, company.password);

    if (!isPasswordValid) {
      throw new BadRequestError("invalid password");
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
  }
}
