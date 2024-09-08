import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";

export class GetUsersBookingUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(userId: string): Promise<any> {
    try {
      const data = await this.bookingRepository.getUsersOrder(userId);

      if (!data) {
        throw new BadRequestError("Can't get bookings for user ID: " + userId);
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
