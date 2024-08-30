import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";

export class GetBookingUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(companyId:string): Promise<any> {

    const data = await this.bookingRepository.getAll(companyId);

    console.log(data,'all bookings of ', companyId);
    

    if (!data) {
      throw new BadRequestError("cant get bookings");
    }
    
    return data;
  }
}
