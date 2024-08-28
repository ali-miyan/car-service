import { IChatRepository } from "../repositories";

export class EditUserUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(userDetails: any): Promise<any> {

    const { userId, username, profileImg } = userDetails;
    await this.chatRepository.editUser(userId, username, profileImg);
    
  }
}
