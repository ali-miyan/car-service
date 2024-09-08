import amqplib, { Channel, Connection } from "amqplib";
import { ProducerService, rabbitMQConfig } from "../rabbitMQConfig";
import { ICarRepository } from "../../../repositories";
import { BadRequestError } from "tune-up-library";

export class ConsumerService {
  private channel!: Channel;
  private carRepository: ICarRepository;
  private producerService: ProducerService;

  constructor(carRepository: ICarRepository, producerService: ProducerService) {
    this.carRepository = carRepository;
    this.producerService = producerService;
    this.init();
  }

  private async init() {
    const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(rabbitMQConfig.queueName1);
    this.startConsuming();
  }

  private startConsuming() {
    this.channel.consume(rabbitMQConfig.queueName1, async (message) => {
      if (message) {
        try {
          const carId = message.content.toString();

          console.log('get this from booking service',carId);
          

          const userDetails = await this.carRepository.getUsersDetails(carId);
          await this.producerService.sendMessage(JSON.stringify(userDetails));
          this.channel.ack(message);
        } catch (error) {
          this.channel.nack(message, false, true);
          throw new BadRequestError("error in rabbitMq" + error);
        }
      }
    });
  }
}
