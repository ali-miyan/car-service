import { BadRequestError } from "tune-up-library";
import {
  IRedisRepository,
  IUserRepository,
  ICarRepository,
} from "../repositories";
import { OtpService } from "../infrastructure/services";
import { hashPassword } from "../utils";
import { Car } from "../entities";

export class AddCarUseCase {
  constructor(private carRepository: ICarRepository) {}
  async execute(
    name: string,
    color: string,
    src: string,
    vin: string
  ): Promise<any> {

    if (!name || !color || !src || !vin) {
      throw new BadRequestError("Invalid input");
    }

    const user = new Car({name,color,src,vin});

    await this.carRepository.save(user);

    return {success:true}

  }
}
