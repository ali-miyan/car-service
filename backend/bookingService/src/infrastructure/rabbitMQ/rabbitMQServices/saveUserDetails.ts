import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from "../rabbitMQConfig";
import { SaveUserDetailsUseCase } from "../../../usecases";
import { BadRequestError } from "tune-up-library";

export class ConsumerService {
  private channel!: Channel;
  private userRepository: SaveUserDetailsUseCase;

  constructor(userRepository: SaveUserDetailsUseCase) {
    this.userRepository = userRepository;
    this.init();
  }

  private async init() {
    const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(rabbitMQConfig.queueName2);
    this.startConsuming();
  }

  private startConsuming() {
    this.channel.consume(rabbitMQConfig.queueName2, async (message) => {
      if (message) {
        try {

          const userDetails = message.content.toString();
          this.channel.ack(message);

          await this.userRepository.execute(JSON.parse(userDetails));
        } catch (error) {
          this.channel.nack(message, false, true);
          throw new BadRequestError("error in rabbitmq" + error);
        }
      }
    });
  }
}
