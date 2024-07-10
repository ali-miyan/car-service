import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../repositories";

export class UpdateServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string,data:object): Promise<any> {

    const service = await this.serviceRepository.getById(id);

    if (!service) {
      throw new BadRequestError(`Service with ID ${id} not found.`);
    }

    await this.serviceRepository.updateStatus(id,data);

    return {success:true}
  }
}
