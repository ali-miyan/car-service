import { BadRequestError } from "tune-up-library";
import { IUserInterface } from "../repositories";
import { User } from "../entities";

export class SaveUserDetailsUseCase {
  constructor(private userRepository: IUserInterface) {}

  async execute(userDetails: any): Promise<any> {
    const { _id, userId, name, color, src, vin } = userDetails;
    const user = new User({ _id, userId, color, name, src, vin });
    const data = await this.userRepository.save(user);
    if (!data) {
      throw new BadRequestError("cant save users");
    }
    return data;
  }
}
