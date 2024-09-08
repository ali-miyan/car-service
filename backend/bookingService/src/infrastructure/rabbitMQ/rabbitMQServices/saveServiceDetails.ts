import amqplib, { Channel, Connection } from "amqplib";
import { RabbitMQService, rabbitMQConfig } from "../rabbitMQConfig";
import { BadRequestError } from "tune-up-library";
import { BookingRepository } from "../../../repositories";

const bookingRepository = new BookingRepository();

export class ConsumerService2 {
  private channel!: Channel;

  constructor() {
    this.init();
  }

  private async init() {
    const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(rabbitMQConfig.queueName5);
    this.startConsuming();
  }

  private startConsuming() {
    this.channel.consume(rabbitMQConfig.queueName5, async (message) => {
      if (message) {
        try {
          const serviceInfo = JSON.parse(message.content.toString());
          const { orderId, ...serviceDetails } = serviceInfo;

          const booked = await bookingRepository.findById(orderId);

          console.log(booked,'get it from rabbitmq',orderId);
          

          if (!booked) {
            throw new Error(`Booking not found for orderId ${orderId}`);
          }

          booked.serviceInfo = serviceDetails;
          await booked.save();

          this.channel.ack(message);
        } catch (error) {
          this.channel.nack(message, false, true);
          throw new BadRequestError("error in rabbitMq" + error);
        }
      }
    });
  }
}
