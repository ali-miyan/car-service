import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class GetUsersUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(): Promise<any> {
      
      const data = await this.userRepository.getAll()
    if(!data){
      throw new BadRequestError('cant get approvals')
    }
    return data;
  }
}
