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
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
