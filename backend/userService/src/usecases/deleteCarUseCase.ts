import { BadRequestError } from "tune-up-library";
import { ICarRepository } from "../repositories";

export class DeleteCarUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(userId: string): Promise<any> {
    try {
      if (!userId) {
        throw new BadRequestError("Invalid input");
      }

      await this.carRepository.deleteById(userId);

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
