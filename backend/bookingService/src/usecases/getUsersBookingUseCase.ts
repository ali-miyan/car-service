import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";

export class GetUsersBookingUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(userId: string): Promise<any> {

    const data = await this.bookingRepository.getUsersOrder(userId);

    if (!data) {
      throw new BadRequestError("cant get bookings");
    }
    return data;
    
  }
}
