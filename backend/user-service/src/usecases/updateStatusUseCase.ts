import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";
import { io } from "..";

export class UpdateStatusUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: any): Promise<any> {
    const user = await this.userRepository.getById(id);

    if (data.isBlocked) {
      io.emit("user_blocked", {
        message: "user has been blocked",
        userId : id
      });
    }

    if (!user) {
      throw new BadRequestError(`user with ID ${id} not found.`);
    }

    await this.userRepository.updateStatus(id, data);

    return { success: true };
  }
}
