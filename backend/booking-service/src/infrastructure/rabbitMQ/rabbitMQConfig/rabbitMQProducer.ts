import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from ".";

export class RabbitMQService {
  private channel?: Channel;
  private connection?: Connection;
  private initializationPromise: Promise<void>;

  constructor() {
    this.initializationPromise = this.init();
  }

  private async init() {
    try {
      this.connection = await amqplib.connect(rabbitMQConfig.uri);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(rabbitMQConfig.queueName1);
    } catch (error) {
      console.error("Failed to initialize ProducerService:", error);
    }
  }

  public async sendMessage(carId: string) {
    await this.initializationPromise;
    try {
      this.channel?.sendToQueue(
        rabbitMQConfig.queueName1,
        Buffer.from(carId)
      );
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }
}
