import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";

export class CancelBookingUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(orderId:string,reason:string): Promise<any> {
   console.log(orderId,reason,'usecase');

   if(!orderId || !reason){
    throw new BadRequestError('invalid input')
   }

   await this.bookingRepository.cancelBooking(orderId,reason);
   
    return {success:true};
  }
}
