import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../repositories";

export class GetServiceUseCase {
  constructor(
    private serviceRepository: ServiceRepository
  ) {}

  async execute(): Promise<any> {
    
    const data = await this.serviceRepository.getAll()
    if(!data){
      throw new BadRequestError('cant get services')
    }
    return data;
  }
}
