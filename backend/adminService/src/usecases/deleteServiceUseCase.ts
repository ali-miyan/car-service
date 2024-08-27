import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../repositories";

export class DeleteServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(serviceId: string): Promise<any> {
    const service = await this.serviceRepository.getById(serviceId);

    if (!service) {
      throw new BadRequestError(`Service with ID ${serviceId} not found.`);
    }

    await this.serviceRepository.deleteOne(serviceId);

    return {success:true}
  }
}
