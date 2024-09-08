import { BadRequestError } from "tune-up-library";
import { IServiceRepository } from "../repositories";

export class GetAllServicesUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(
    serviceId: any,
    companyId: any,
    search: any,
    sort: any,
    page: number = 1,
    pageSize: number = 6
  ): Promise<any> {
    try {
      let services = await this.serviceRepository.getEveryService();

      if (!services) {
        throw new BadRequestError("Unable to fetch services");
      }

      if (serviceId) {
        services = services.filter(
          (s) => s.generalServiceId.toString() === serviceId
        );
      }

      if (companyId) {
        services = services.filter(
          (s) => s.companyId._id.toString() === companyId
        );
      }

      if (search) {
        services = services.filter((s: any) =>
          s.companyId.companyName.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (sort) {
        if (sort === "low-to-high") {
          services.sort(
            (a, b) => a.basicPackage.detail.price - b.basicPackage.detail.price
          );
        } else if (sort === "high-to-low") {
          services.sort(
            (a, b) => b.basicPackage.detail.price - a.basicPackage.detail.price
          );
        }
      }

      const totalServices = services.length;
      const totalPages = Math.ceil(totalServices / pageSize);
      const paginatedServices = services.slice(
        (page - 1) * pageSize,
        page * pageSize
      );

      return {
        services: paginatedServices,
        totalPages,
        currentPage: page,
        pageSize,
        totalServices,
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
