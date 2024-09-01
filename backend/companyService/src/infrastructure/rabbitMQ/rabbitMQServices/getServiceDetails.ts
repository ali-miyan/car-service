import amqplib, { Channel, Connection } from "amqplib";
import { RabbitMQService, rabbitMQConfig } from "../rabbitMQConfig";
import { BadRequestError } from "tune-up-library";
import { ServiceRepository } from "../../../repositories";

const serviceRepository = new ServiceRepository();

export class ConsumerService2 {
  private channel!: Channel;
  private producerService: RabbitMQService;

  constructor(producerService: RabbitMQService) {
    this.producerService = producerService;
    this.init();
  }

  private async init() {
    const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(rabbitMQConfig.queueName3);
    this.startConsuming();
  }

  private startConsuming() {
    this.channel.consume(rabbitMQConfig.queueName3, async (message) => {
      if (message) {
        try {
          const serviveInfo = message.content.toString();
          const { serviceId, typeOfPackage , orderId } = JSON.parse(serviveInfo);

          console.log(serviceId, typeOfPackage,orderId, "reached heree");

          const data = await serviceRepository.getPackageDetails(
            serviceId,
            typeOfPackage
          );

          await this.producerService.sendServiceMessage({...data,orderId});
          this.channel.ack(message);
        } catch (error) {
          this.channel.nack(message, false, true);
          throw new BadRequestError("error in rabbitMq" + error);
        }
      }
    });
  }
}
