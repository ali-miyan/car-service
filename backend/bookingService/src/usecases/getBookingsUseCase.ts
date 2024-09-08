import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";

export class GetBookingUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(companyId: string): Promise<any> {
    try {
      const data = await this.bookingRepository.getAll(companyId);

      if (!data) {
        throw new BadRequestError("Cannot get bookings");
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
