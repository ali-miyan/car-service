import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";
import { Booking } from "../entities";
import { v4 as uuidv4 } from "uuid";
import {
  checkSlotAvailability,
  StripeService,
} from "../infrastructure/services";
import { io } from "..";

export class BookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private stripeService: StripeService
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

    let status: "Booking Pending" | "Booking Confirmed" =
      payment.toLowerCase() === "cash"
        ? "Booking Confirmed"
        : "Booking Pending";
    let response: any = { success: true };

    const booking = new Booking({
      userId,
      companyId,
      generalServiceId,
      serviceId,
      date,
      payment,
      address,
      status,
      typeOfPackage,
      servicePlace,
      carId,
      totalPrice,
    });

    const order = await this.bookingRepository.save(booking);

    if (payment.toLowerCase() === "online") {
      try {
        const sessionId = await this.stripeService.createCheckoutSession(
          totalPrice,
          order.id
        );
        response = { id: sessionId, orderToken: order.id };
      } catch (error) {
        throw new BadRequestError(
          "Error creating Stripe checkout session: " + error
        );
      }
    }

    io.emit("order_booked", {
      message: "Order has been booked",
      order
    });

    return response;
  }
}
