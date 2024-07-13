import { BadRequestError } from "tune-up-library";
import { ICompanyRepository } from "../repositories";

export class GetApprovalUseCase {
  constructor(
    private companyRepository: ICompanyRepository
  ) {}

  async execute(): Promise<any> {
      
      const data = await this.companyRepository.getAll()
      console.log('approval',data);
    if(!data){
      throw new BadRequestError('cant get approvals')
    }
    return data;
  }
}
