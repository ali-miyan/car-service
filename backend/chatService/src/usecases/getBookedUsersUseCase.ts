import { BadRequestError, NotFoundError } from "tune-up-library";
import { getUsersFromBooking } from "../infrastructure/grpc/grpcServices";

export class GetBookedUsersUseCase {
  constructor() {}

  async execute(companyId: string): Promise<any> {
    try {
      if (!companyId) {
        throw new BadRequestError("invalid input");
      }
      const { users } = await getUsersFromBooking(companyId);

      return users;
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }
}
