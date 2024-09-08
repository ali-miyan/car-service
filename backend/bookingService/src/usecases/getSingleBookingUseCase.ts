import { BadRequestError } from "tune-up-library";
import { IBookingRepository, IUserInterface } from "../repositories";

export class GetSingleBookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private userRepository: IUserInterface
  ) {}

  async execute(orderId: string): Promise<any> {
    try {
      const data = await this.bookingRepository.getSingle(orderId);

      if (!data) {
        throw new BadRequestError(
          "Cannot get booking with the provided order ID"
        );
      }

      const userDetails = await this.userRepository.findOne(data.carId);

      return { data, ...userDetails };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
