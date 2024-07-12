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
    address: string
  ): Promise<any> {
    if (isLicenseExpired(licenseExpiry)) {
      throw new BadRequestError("Your License has expired, please renew");
    }

    const [licenseImgFile, approvedImgFile, logo] = files;
    console.log(licenseImgFile, "--->>", approvedImgFile);

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

    const hashedPassword = await hashPassword(password)

    const company = new Company({
      ownerName,
      companyName,
      logo: uploadedFiles["logo"],
      contact1,
      contact2,
      year,
      email,
      password:hashedPassword,
      licenseExpiry,
      approvedImg: uploadedFiles["approvedImg"],
      licenseImg: uploadedFiles["licenseImg"],
      licenseNumber,
      address: JSON.parse(address),
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
  }
}
