import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class GetUserByIdUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(id:string): Promise<any> {
      
      const data = await this.userRepository.getById(id)
    if(!data){
      throw new BadRequestError('cant get approvals')
    }
    return data;
  }
}
