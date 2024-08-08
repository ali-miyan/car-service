import { BadRequestError } from "tune-up-library";
import { IBookingRepository, IUserInterface } from "../repositories";
import { getServiceDetails } from "../infrastructure/grpc/grpcServices/getServiceDetails";

export class GetSingleBookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private userRepository: IUserInterface
  ) {}

  async execute(orderId: string): Promise<any> {
    const data = await this.bookingRepository.getSingle(orderId);

    const userDetails = await this.userRepository.findOne(data.carId);
    const standardPackage = await getServiceDetails(
      data.serviceId,
      data.typeOfPackage
    );

    console.log(userDetails,'userdetailsss');
    

    if (!data) {
      throw new BadRequestError("cant get bookings");
    }
    return { data, ...userDetails, ...standardPackage };
  }
}
