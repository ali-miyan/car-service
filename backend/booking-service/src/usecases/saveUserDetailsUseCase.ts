import { BadRequestError } from "tune-up-library";
import { IUserInterface } from "../repositories";
import { User } from "../entities";

export class SaveUserDetailsUseCase {
  constructor(private userRepository: IUserInterface) {}

  async execute(userDetails:User): Promise<any> {
    const data = await this.userRepository.save(userDetails);
    if (!data) {
      throw new BadRequestError("cant save users");
    }
    return data;
  }
}
