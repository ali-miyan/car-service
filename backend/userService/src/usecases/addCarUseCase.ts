import { BadRequestError } from "tune-up-library";
import {
  ICarRepository,
} from "../repositories";
import { Car } from "../entities";

export class AddCarUseCase {
  constructor(private carRepository: ICarRepository) {}
  async execute(
    userId:string,
    name: string,
    color: string,
    src: string,
    vin: string
  ): Promise<any> {

    if (!name || !color || !src || !vin) {
      throw new BadRequestError("Invalid input");
    }

    const user = new Car({userId,name,color,src,vin});

    await this.carRepository.save(user);

    return {success:true}

  }
}
