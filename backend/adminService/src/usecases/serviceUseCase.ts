import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../repositories";
import { S3Service } from "../infrastructure/services";

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
    try {
      if (!serviceName || !description || !services) {
        throw new BadRequestError("Invalid input");
      }

      const logoUrl = await this.s3ServiceRepository.uploadFile(
        "tune-up",
        originalname,
        buffer,
        mimetype
      );

      const currentServices = await this.serviceRepository.getAll(null);

      const serviceExists = currentServices.some(
        (service: { serviceName: string }) =>
          service.serviceName.toLowerCase() === serviceName.toLowerCase()
      );

      if (serviceExists) {
        throw new BadRequestError(
          `Service with the name '${serviceName}' already exists.`
        );
      }

      const subServicesObjects = services.map((name: string) => ({ name }));

      await this.serviceRepository.save({
        serviceName,
        description,
        logoUrl,
        subServices: subServicesObjects,
      });

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
