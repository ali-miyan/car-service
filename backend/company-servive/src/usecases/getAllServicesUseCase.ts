import { BadRequestError } from "tune-up-library";
import { IServiceRepository } from "../repositories";

export class GetAllServicesUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(
    serviceId: any,
    companyId: any,
    search: any,
    sort: any,
    page: any = 1,
    limit: number = 4

  ): Promise<any> {
    console.log(page,'[agepge');
    
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
        services.sort((a, b) => a.basicPackage.detail.price - b.basicPackage.detail.price);
      } else if (sort === "high-to-low") {
        services.sort((a, b) => b.basicPackage.detail.price - a.basicPackage.detail.price );
      }
    }

    const offset = (page - 1) * limit;
    services = services.slice(offset, offset + limit);

    console.log(services.length,'lengtj');
    


    return services;
  }
}
