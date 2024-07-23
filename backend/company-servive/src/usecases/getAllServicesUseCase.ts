import { BadRequestError } from "tune-up-library";
import { IServiecRepository } from "../repositories";

export class GetAllServicesUseCase {
  constructor(
    private serviceRepository: IServiecRepository
  ) {}

  async execute(): Promise<any> {
      
      const data = await this.serviceRepository.getEveryService()
      console.log('alll services',data);
    if(!data){
      throw new BadRequestError('cant get approvals')
    }
    return data;
  }
}
