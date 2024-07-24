import { BadRequestError } from "tune-up-library";
import { IServiecRepository } from "../repositories";

export class GetSignleServicesUseCase {
  constructor(
    private serviceRepository: IServiecRepository
  ) {}

  async execute(id:string): Promise<any> {
      
      const data = await this.serviceRepository.getSingle(id)
      console.log('alll services',data);
    if(!data){
      throw new BadRequestError('cant get approvals')
    }
    return data;
  }
}
