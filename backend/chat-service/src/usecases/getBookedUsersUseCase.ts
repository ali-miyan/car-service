import { BadRequestError, NotFoundError } from "tune-up-library";
import { IChatRepository } from "../repositories";
import { getUsersFromBooking } from "../infrastructure/grpc/grpcServices";

export class GetBookedUsersUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(companyId: string): Promise<any> {
    try {
      if (!companyId) {
        throw new BadRequestError("invalid input");
      }
      const { users } = await getUsersFromBooking(companyId);


      return users;
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }
}
