import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class UpdateStatusUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string,data:object): Promise<any> {

    const service = await this.userRepository.getById(id);

    if (!service) {
      throw new BadRequestError(`user with ID ${id} not found.`);
    }

    await this.userRepository.updateStatus(id,data);

    return {success:true}
  }
}
