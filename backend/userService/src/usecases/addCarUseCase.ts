import { BadRequestError } from "tune-up-library";
import { ICarRepository } from "../repositories";
import { Car } from "../entities";

export class AddCarUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(
    userId: string,
    name: string,
    color: string,
    src: string,
    vin: string
  ): Promise<any> {
    try {
      if (!name || !color || !src || !vin) {
        throw new BadRequestError("Invalid input");
      }

      const car = new Car({ userId, name, color, src, vin });

      await this.carRepository.save(car);

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
