import { BadRequestError } from "tune-up-library";
import { IServiecRepository } from "../repositories";

export class GetAllServicesUseCase {
  constructor(private serviceRepository: IServiecRepository) {}

  async execute(serviceId:any , companyId:any): Promise<any> {
    let services = await this.serviceRepository.getEveryService();

    console.log(services,serviceId,companyId);
    
    
    if (!services) {
      throw new BadRequestError('Unable to fetch services');
    }
    
    if (serviceId) {
      services = services.filter(s => s.generalServiceId.toString() === serviceId);
      console.log(serviceId,'with',services);
    }
    
    if (companyId) {
      services = services.filter(s => s.companyId._id.toString() === companyId);
      console.log(companyId,'with',services);
    }

    return services;
  }
}
