import { BadRequestError } from "tune-up-library";
import { IUserInterface } from "../repositories";
import { User } from "../entities";

export class EditUserUseCase {
  constructor(private userRepository: IUserInterface) {}

  async execute(userDetails: any): Promise<any> {

    const { userId, username, phone, profileImg } = userDetails;

    await this.userRepository.editUser(userId, username, phone, profileImg);
    
  }
}
