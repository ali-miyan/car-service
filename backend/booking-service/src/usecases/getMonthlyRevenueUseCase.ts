import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";

export class GetMonthlyRevenueUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(companyId: string): Promise<any> {
    if (!companyId) {
      throw new BadRequestError("cant get id");
    }
    return await this.bookingRepository.getMontlyRevenue(companyId);
  }
}
