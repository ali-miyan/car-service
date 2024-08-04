import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";
import { getUsersDetails } from "../infrastructure/grpc/grpcServices/getUserService";
import { getServiceDetails } from "../infrastructure/grpc/grpcServices/getServiceDetails";

export class GetSingleBookingUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(companyId: string): Promise<any> {
    const data = await this.bookingRepository.getSingle(companyId);

    const { userDetails } = await getUsersDetails(data.userId,data.carId);
    const  standardPackage  = await getServiceDetails(
      data.serviceId,
      data.typeOfPackage
    );

    console.log(userDetails, "got userDetailss", standardPackage);

    if (!data) {
      throw new BadRequestError("cant get bookings");
    }
    return { data, ...userDetails, ...standardPackage };
  }
}
