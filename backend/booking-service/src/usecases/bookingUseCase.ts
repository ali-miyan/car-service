import { BadRequestError } from "tune-up-library";
import { IBookingRepository} from "../repositories";
import { Booking } from "../entities";

export class BookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository
  ) {}

  async execute(
    userId: string,
    generalServiceId:string,
    serviceId:string,
    date: string,
    servicePlace:string,
    serviceType: string,
    typeOfPackage: string,
    totalPrice: number
  ): Promise<any> {

    if(!userId || !date || !generalServiceId || !serviceId || !servicePlace || !serviceType || !typeOfPackage || !totalPrice){
        throw new BadRequestError("invalid input");
    }

    const booking = new Booking({userId,generalServiceId,serviceId,date,servicePlace,serviceType,status:"pending",totalPrice,typeOfPackage})

    
    await this.bookingRepository.save(booking)
    
    return { success: true };
  }
}
