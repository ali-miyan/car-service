import { io } from "..";
import { IBookingRepository } from "../repositories";
import { BadRequestError } from "tune-up-library";

export class UpdateStatusUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(orderId: string, status: string): Promise<void> {
    if (!orderId || !status) {
      throw new BadRequestError("Invalid input");
    }

    await this.bookingRepository.updateBookingStatus(orderId, status);
    io.emit("order_updated", {
      message: "order update",
      status,
    });
  }
}
