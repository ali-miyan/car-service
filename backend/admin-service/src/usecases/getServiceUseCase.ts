import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../repositories";
import { getCompanyIds } from "../infrastructure/grpc";

export class GetServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(companyId: string | undefined): Promise<any> {
    
    let ids: string[] | null = null;

    if (companyId) {
      const result = await getCompanyIds(companyId as string);
      ids = result?.ids ?? null;
    }

    const data = await this.serviceRepository.getAll(ids);

    if (!data) {
      throw new BadRequestError("Can't get services");
    }
    return data;
  }
}
