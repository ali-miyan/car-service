import { BadRequestError } from "tune-up-library";
import { IUserInterface } from "../repositories";
import { User } from "../entities";

export class SaveUserDetailsUseCase {
  constructor(private userRepository: IUserInterface) {}

  async execute(userDetails: any): Promise<any> {
    try {
      const { _id, userId, name, color, src, vin } = userDetails;

      if (!_id || !userId || !name || !color || !src || !vin) {
        throw new BadRequestError("Missing required user details");
      }

      const user = new User({ carId: _id, userId, color, name, src, vin });
      const data = await this.userRepository.save(user);

      if (!data) {
        throw new BadRequestError("Cannot save user details");
      }

      return data;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
