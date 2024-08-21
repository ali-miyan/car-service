import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";
import { Booking } from "../entities";
import { v4 as uuidv4 } from "uuid";
import {
  checkSlotAvailability,
  StripeService,
} from "../infrastructure/services";
import { io } from "..";
import { RabbitMQService } from "../infrastructure/rabbitMQ/rabbitMQConfig";

export class BookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private stripeService: StripeService,
    private rabbitMQService: RabbitMQService
  ) {}

  async execute(
    userId: string,
    companyId: string,
    generalServiceId: string,
    serviceId: string,
    date: string,
    payment: string,
    servicePlace: string,
    address: object,
    typeOfPackage: string,
    carId: string,
    totalPrice: number
  ): Promise<any> {
    if (
      !userId ||
      !date ||
      !generalServiceId ||
      !serviceId ||
      !servicePlace ||
      !address ||
      !typeOfPackage ||
      !totalPrice ||
      !companyId ||
      !payment ||
      !carId
    ) {
      throw new BadRequestError("Invalid input");
    }

    const slotAvailability = await checkSlotAvailability(serviceId);
    console.log(slotAvailability, "slot avaialbility");

    if (!slotAvailability.available) {
      throw new BadRequestError("No slots available for the selected service.");
    }

    let response: any = { success: true };

    const booking = new Booking({
      userId,
      companyId,
      generalServiceId,
      serviceId,
      date,
      payment,
      address,
      status:"Booking Confirmed",
      typeOfPackage,
      servicePlace,
      carId,
      totalPrice,
    });
    

    if (payment.toLowerCase() === "online") {
      const sessionId = await this.stripeService.createCheckoutSession(
        totalPrice,
        booking
      );
      response = { id: sessionId };
    } else {
      const order = await this.bookingRepository.save(booking);
      io.emit("order_booked", {
        message: "Order has been booked",
        order,
      });

      await this.rabbitMQService.sendMessage(order.carId);
    }

    return response;
  }
}
