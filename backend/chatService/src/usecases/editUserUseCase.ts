import { IChatRepository } from "../repositories";

export class EditUserUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(userDetails: any): Promise<any> {
    const { userId, username, profileImg } = userDetails;

    console.log(userDetails,'got all detailsss from kafka to chat');
    

     await this.chatRepository.editUser(userId, username, profileImg);

  }
}
