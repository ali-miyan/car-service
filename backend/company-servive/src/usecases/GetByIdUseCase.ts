import { BadRequestError } from "tune-up-library";
import { ICompanyRepository } from "../repositories";

export class GetByIdUseCase {
  constructor(
    private companyRepository: ICompanyRepository
  ) {}

  async execute(id:string): Promise<any> {

    if(!id){
        throw new BadRequestError('invalid id')
    }
      
      const data = await this.companyRepository.getById(id)
    if(!data){
      throw new BadRequestError('cant get approvals')
    }
    return data;
  }
}
