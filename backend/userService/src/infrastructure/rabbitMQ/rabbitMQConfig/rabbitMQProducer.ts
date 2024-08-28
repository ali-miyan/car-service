import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from ".";
import { BadRequestError } from "tune-up-library";

export class ProducerService {
  private channel!: Channel;

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(rabbitMQConfig.queueName2);
      await this.channel.assertQueue(rabbitMQConfig.queueName3);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  public async sendMessage(message: string) {
    try {
      this.channel.sendToQueue(rabbitMQConfig.queueName2, Buffer.from(message));
    } catch (error) {
      throw new BadRequestError("error in rabbitMq" + error);
    }
  }
  public async sendRating(message: string) {
    try {
      this.channel.sendToQueue(rabbitMQConfig.queueName3, Buffer.from(message));
    } catch (error) {
      throw new BadRequestError("error in rabbitMq" + error);
    }
  }
}
