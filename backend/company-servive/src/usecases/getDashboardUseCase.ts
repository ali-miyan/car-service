import { BadRequestError } from "tune-up-library";
import { ICompanyRepository, IServiceRepository } from "../repositories";

export class GetDashboardUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private serviceRepository: IServiceRepository
  ) {}

  async execute(): Promise<any> {
    const monthlyCount = await this.companyRepository.getMonthlyCompanyCounts();
    const totalCount = await this.companyRepository.getTotalCompanyCounts();
    const totalServices = await this.serviceRepository.getTotalServices();
    const companies = await this.companyRepository.getAll();

    return {
      monthlyCount,
      totalCount,
      totalServices,
      companies,
    };
  }
}
