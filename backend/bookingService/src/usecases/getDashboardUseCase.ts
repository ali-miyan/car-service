import { BadRequestError } from "tune-up-library";
import { IBookingRepository, IUserInterface } from "../repositories";

export class GetDashboardUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private userRepository: IUserInterface
  ) {}

  async execute(companyId: string): Promise<any> {
    try {
      if (!companyId) {
        throw new BadRequestError("Cannot get ID");
      }

      const monthlyRevenue = await this.bookingRepository.getMontlyRevenue(
        companyId
      );
      const totalRevenue = await this.bookingRepository.getTotalRevenue(
        companyId
      );
      const bookingCount = await this.bookingRepository.getBookingCount(
        companyId
      );
      const mostBookedServicePlace =
        await this.bookingRepository.getMostBookedServicePlace(companyId);
      const getBookedUserDetails =
        await this.userRepository.getBookedUserDetails(companyId);

      return {
        monthlyRevenue,
        totalRevenue,
        bookingCount,
        mostBookedServicePlace,
        getBookedUserDetails,
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
