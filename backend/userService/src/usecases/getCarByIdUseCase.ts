import { BadRequestError } from "tune-up-library";
import { ICarRepository } from "../repositories";

export class GetCarByIdUseCase {
  constructor(private carRepository: ICarRepository) {}
  async execute(
    id:string
  ): Promise<any> {

    if (!id) {
      throw new BadRequestError("Invalid input");
    }

    const car = await this.carRepository.getById(id);

    return {success:true,car}
  }
}
