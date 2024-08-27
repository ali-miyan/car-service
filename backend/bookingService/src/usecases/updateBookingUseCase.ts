import { Booking } from "../entities";
import { IBookingRepository } from "../repositories";
import { BadRequestError } from "tune-up-library";

export class UpdateBookingStatusUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestError("Invalid input");
    }

     await this.bookingRepository.updateStatus(id);

  }
}
