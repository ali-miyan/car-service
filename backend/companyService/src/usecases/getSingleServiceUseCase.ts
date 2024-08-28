import { BadRequestError } from "tune-up-library";
import { IServiceRepository } from "../repositories";

export class GetSignleServicesUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: string): Promise<any> {
    const data = await this.serviceRepository.getSingle(id);
    if (!data) {
      throw new BadRequestError("cant get approvals");
    }
    return data;
  }
}
