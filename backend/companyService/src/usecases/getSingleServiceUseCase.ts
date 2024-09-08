import { BadRequestError } from "tune-up-library";
import { IServiceRepository } from "../repositories";

export class GetSingleServicesUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: string): Promise<any> {
    try {
      const data = await this.serviceRepository.getSingle(id);

      if (!data) {
        throw new BadRequestError("Cannot get service details");
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
