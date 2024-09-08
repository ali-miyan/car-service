import { Company } from "../entities/companyEntity";
import { ICompanyRepository } from "../repositories/interfaces";
import { isLicenseExpired } from "../utils/dateUtil";
import { S3Service } from "../infrastructure/services";
import { BadRequestError, TokenService } from "tune-up-library";
import { hashPassword } from "../utils/bcrypt";

export class RegisterUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private s3ServiceRepository: S3Service
  ) {}

  async execute(
    ownerName: string,
    companyName: string,
    year: number,
    contact1: number,
    contact2: number,
    email: string,
    licenseNumber: string,
    licenseExpiry: string,
    password: string,
    files: any,
    description: string,
    address: string
  ): Promise<any> {
    try {
      if (isLicenseExpired(licenseExpiry)) {
        throw new BadRequestError("Your License has expired, please renew");
      }

      const [logo, licenseImgFile, approvedImgFile] = files;

      const uploadedFiles = await this.s3ServiceRepository.uploadFiles(
        "tune-up",
        {
          logo: { buffer: logo.buffer, contentType: logo.mimetype },
          licenseImg: {
            buffer: licenseImgFile.buffer,
            contentType: licenseImgFile.mimetype,
          },
          approvedImg: {
            buffer: approvedImgFile.buffer,
            contentType: approvedImgFile.mimetype,
          },
        }
      );

      const hashedPassword = await hashPassword(password);

      const company = new Company({
        ownerName,
        companyName,
        logo: uploadedFiles["logo"],
        contact1,
        contact2,
        year,
        email,
        password: hashedPassword,
        licenseExpiry,
        licenseImg: uploadedFiles["licenseImg"],
        approvedImg: uploadedFiles["approvedImg"],
        licenseNumber,
        description,
        address: JSON.parse(address),
        isApproved: "pending",
      });

      const token = TokenService.generateToken({
        user: company._id,
        role: "company",
      });
      const refreshToken = TokenService.generateRefreshToken({
        user: company._id,
        role: "company",
      });

      await this.companyRepository.save(company);

      return { success: true, token, refreshToken };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
