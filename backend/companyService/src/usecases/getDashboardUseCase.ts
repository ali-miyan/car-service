import { BadRequestError } from "tune-up-library";
import { ICompanyRepository, IServiceRepository } from "../repositories";

export class GetDashboardUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private serviceRepository: IServiceRepository
  ) {}

  async execute(): Promise<any> {
    try {
      const monthlyCount =
        await this.companyRepository.getMonthlyCompanyCounts();
      const totalCount = await this.companyRepository.getTotalCompanyCounts();
      const totalServices = await this.serviceRepository.getTotalServices();
      const companies = await this.companyRepository.getAll();

      return {
        monthlyCount,
        totalCount,
        totalServices,
        companies,
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
