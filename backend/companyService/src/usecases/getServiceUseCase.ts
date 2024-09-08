import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../repositories";

export class GetServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<any> {
    try {
      const data = await this.serviceRepository.getAll(id);

      if (!data) {
        throw new BadRequestError("Can't get services");
      }

      return data;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
