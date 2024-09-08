import { BadRequestError } from "tune-up-library";
import { ICarRepository } from "../repositories";

export class GetCarByIdUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(id: string): Promise<any> {
    try {
      if (!id) {
        throw new BadRequestError("Invalid input");
      }

      const car = await this.carRepository.getById(id);

      if (!car) {
        throw new BadRequestError("Car not found");
      }

      return { success: true, car };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
