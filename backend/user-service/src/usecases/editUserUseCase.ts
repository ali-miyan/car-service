import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class EditUSerUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: string,
    username: string,
    phone: null | number
  ): Promise<any> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestError(`user with ID ${id} not found.`);
    }

    await this.userRepository.updateCredentials(id, username, phone);

    return { success: true };
  }
}
