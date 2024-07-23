import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../repositories";

export class GetServiceUseCase {
  constructor(
    private serviceRepository: ServiceRepository
  ) {}

  async execute(
    id:string
  ): Promise<any> {
    
    const data = await this.serviceRepository.getAll(id)
    if(!data){
      throw new BadRequestError('cant get services')
    }
    return data;
  }
}
