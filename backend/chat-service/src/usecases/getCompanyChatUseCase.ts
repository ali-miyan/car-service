import { BadRequestError, NotFoundError } from "tune-up-library";
import { IChatRepository } from "../repositories";
import { getUsersFromBooking } from "../infrastructure/grpc/grpcServices";
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


export class GetCompanyChatUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(companyId: string): Promise<any> {
    try {
      if (!companyId) {
        throw new BadRequestError("invalid input");
      }

      const chat:any = await this.chatRepository.getById(companyId);
      const { users }:any = await getUsersFromBooking(companyId);

      

      const userIdsToRemove = users.map((item:any) => item.userId);
      const filteredArray = userIdsToRemove.map((id:any) => {
        const userObj = chat.find((item:any) => item.user.userId.toString() !== id);
        return userObj ? userObj : null;
      });

      return filteredArray[0] ? filteredArray : null;
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }
}
