import { BadRequestError } from "tune-up-library";
import { IBookingRepository } from "../repositories";
import { Booking } from "../entities";
import { io } from "..";
import { RabbitMQService } from "../infrastructure/rabbitMQ/rabbitMQConfig";
import { decompressObject, parseOrderData } from "../utils/compressObject";

export class HandleStripeUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private rabbitMQService: RabbitMQService
  ) {}

  async execute(event: any): Promise<any> {
    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { orderData } = session.metadata;

        const isRefund = parseOrderData(orderData);

        if (isRefund) {
          const order = await this.bookingRepository.findById(
            isRefund.booking.orderId
          );
          order.refundStatus = "completed";
          await order.save();
          await this.rabbitMQService.sendMessageToUser({
            userId: isRefund.booking.userId,
            amount: isRefund.totalPrice,
            stat: "credit",
          });
        } else {
          const order = decompressObject(orderData);
          const booking = new Booking(order);

          const bookingData = await this.bookingRepository.save(booking);

          io.emit("order_booked", {
            message: "Order has been booked",
            order,
          });

          await this.rabbitMQService.sendMessage(order.carId);
          await this.rabbitMQService.sendServiceMessage({
            serviceId: order.serviceId,
            typeOfPackage: order.typeOfPackage,
            orderId: bookingData.id,
          });
        }
      }
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
