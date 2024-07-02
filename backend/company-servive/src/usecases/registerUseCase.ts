import { Company } from "../entities/companyEntity";
import { ICompanyRepository } from '../repositories/interfaces';
import { isLicenseExpired } from "../utils/dateUtil";
import { IS3Service } from "../repositories/interfaces";

export class RegisterUseCase {
    constructor(
        private companyRepository: ICompanyRepository,
        private s3ServiceRepository: IS3Service
    ) {}

    async execute(
        ownerName: string,
        companyName: string,
        year: number,
        contact1: number,
        contact2: number,
        email: string,
        licenseNumber: number,
        licenseExpiry: string,
        password: string,
        files: any
    ): Promise<Company> {

        const existingEmail = await this.companyRepository.findByEmail(email);

        if (existingEmail) {
            throw new Error("This Email is already registered");
        }

        if (isLicenseExpired(licenseExpiry)) {
            throw new Error("Your License has expired, please renew");
        }

        const [licenseImgFile, approvedImgFile, logo] = files;
        console.log(licenseImgFile, '-??', approvedImgFile);

        const uploadedFiles = await this.s3ServiceRepository.uploadFiles('tune-up', {
            'logo': { buffer: logo.buffer, contentType: logo.mimetype },
            'licenseImg': { buffer: licenseImgFile.buffer, contentType: licenseImgFile.mimetype },
            'approvedImg': { buffer: approvedImgFile.buffer, contentType: approvedImgFile.mimetype }
        });

        console.log(uploadedFiles);

        const company = new Company({
            ownerName,
            companyName,
            logo: uploadedFiles['logo'],
            contact1,
            contact2,
            year,
            email,
            password,
            licenseExpiry,
            approvedImg: uploadedFiles['approvedImg'],
            licenseImg: uploadedFiles['licenseImg'],
            licenseNumber
        });

        console.log(company, 'company entity object');
        return await this.companyRepository.save(company);
    }
}
