import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";
import { Booking } from "../entities";
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
    try {
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
      console.log(slotAvailability, "slot availability");

      if (!slotAvailability.available) {
        throw new BadRequestError(
          "No slots available for the selected service."
        );
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
        status: "Booking Confirmed",
        typeOfPackage,
        servicePlace,
        serviceInfo: {},
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
        if (payment.toLowerCase() === "wallet") {
          await this.rabbitMQService.sendMessageToUser({
            userId,
            amount: totalPrice.toString(),
            stat: "debit",
          });
        }

        const order = await this.bookingRepository.save(booking);

        console.log(order, "order saved");

        io.emit("order_booked", {
          message: "Order has been booked",
          order,
        });

        await this.rabbitMQService.sendMessage(order.carId);
        await this.rabbitMQService.sendServiceMessage({
          serviceId: order.serviceId,
          typeOfPackage: order.typeOfPackage,
          orderId: order.id,
        });
      }

      return response;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
