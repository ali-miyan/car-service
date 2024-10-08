import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../repositories";

export class ServiceStatusUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string, data: object): Promise<any> {
    try {
      const service = await this.serviceRepository.getById(id);

      if (!service) {
        throw new BadRequestError(`Service with ID ${id} not found.`);
      }

      await this.serviceRepository.updateStatus(id, data);

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
