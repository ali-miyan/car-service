import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";

export class CancelBookingUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(orderId: string, reason: string): Promise<any> {
    try {
      if (!orderId || !reason) {
        throw new BadRequestError("Invalid input");
      }

      await this.bookingRepository.cancelBooking(orderId, reason);

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
