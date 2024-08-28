import { BadRequestError } from "tune-up-library";
import { ICarRepository } from "../repositories";

export class GetOneCarUseCase {
  constructor(private carRepository: ICarRepository) {}
  async execute(id: string): Promise<any> {
    if (!id) {
      throw new BadRequestError("Invalid input");
    }

    const car = await this.carRepository.getOne(id);

    return car;
  }
}
