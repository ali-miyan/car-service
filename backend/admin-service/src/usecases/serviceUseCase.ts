import { BadRequestError } from "tune-up-library";
import { S3Service, ServiceRepository } from "../repositories";

export class ServiceUseCase {
  constructor(
    private s3ServiceRepository: S3Service,
    private serviceRepository: ServiceRepository
  ) {}

  async execute(
    serviceName: string,
    description: string,
    services: [],
    originalname: string,
    buffer: Buffer,
    mimetype: string
  ): Promise<any> {

    if(!serviceName || !description || !services ){
        throw new BadRequestError("invalid input");
    }

    const logoUrl = await this.s3ServiceRepository.uploadFile("tune-up",originalname,buffer,mimetype);

    const subServicesObjects = services.map((name: string) => ({ name }));
    
    await this.serviceRepository.save({serviceName,description,logoUrl,subServices:subServicesObjects})
    
    return { success: true };
  }
}
