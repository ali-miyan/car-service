import { Company } from "../entities/companyEntity";
import { ICompanyRepository } from "../repositories/interfaces";
import { isLicenseExpired } from "../utils/dateUtil";
import { S3Service } from "../infrastructure/services";
import { BadRequestError, TokenService } from "tune-up-library";
import { hashPassword } from "../utils/bcrypt";
import { parseSubService } from "../utils/parseData";
import { Service } from "../entities";
import { ServiceRepository } from "../repositories/implementation";

export class AddServiceUseCase {
  constructor(
    private s3ServiceRepository: S3Service,
    private serviceRepository:ServiceRepository
  ) {}

  async execute(
    generalServiceId: string,
    companyId: string,
    selectedHours: string,
    experience: number,
    terms: string,
    basicSubService: [string, string],
    standardSubService: [string, string],
    premiumSubService: [string, string],
    files:any
  ): Promise<any> {
    
    const basicPackage = parseSubService(basicSubService);
    const standardPackage = parseSubService(standardSubService);
    const premiumPackage = parseSubService(premiumSubService);
    
    const uploadedFiles = await this.s3ServiceRepository.uploadImageArray("tune-up",files);
    
    console.log(uploadedFiles,'uploaded files');
    
    
    const service = new Service({
      generalServiceId,
      companyId,
      selectedHours,
      experience,
      terms,
      images:uploadedFiles,
      basicPackage:basicPackage ,
      standardPackage:standardPackage,
      premiumPackage:premiumPackage,
      isBlocked:false
    });
    
    console.log(service,'saveing service');
    
    await this.serviceRepository.save(service)
    
    return true;
    
  }
}
