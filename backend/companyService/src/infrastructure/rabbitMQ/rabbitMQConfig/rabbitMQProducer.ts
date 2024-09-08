import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from ".";
import { BadRequestError } from "tune-up-library";

export class RabbitMQService {
  private channel?: Channel;
  private connection?: Connection;
  private initializationPromise: Promise<void>;
  private maxRetries: number = 5;
  private retryDelay: number = 5000;

  constructor() {
    this.initializationPromise = this.initWithRetry();
  }

  private async initWithRetry(attempt: number = 1): Promise<void> {
    try {
      this.connection = await amqplib.connect(rabbitMQConfig.uri);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(rabbitMQConfig.queueName2);
      console.log("RabbitMQ connection established successfully");
    } catch (error) {
      console.error(
        `RabbitMQ connection failed on attempt ${attempt}. Error: ${error}`
      );
      if (attempt <= this.maxRetries) {
        console.log(
          `Retrying to connect to RabbitMQ in ${
            this.retryDelay / 1000
          } seconds...`
        );
        await this.delay(this.retryDelay);
        return this.initWithRetry(attempt + 1);
      } else {
        throw new BadRequestError(
          `Failed to initialize ProducerService after ${this.maxRetries} attempts: ${error}`
        );
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async sendServiceMessage(serviceInfo: object) {
    await this.initializationPromise;
    try {
      const message = JSON.stringify(serviceInfo);
      console.log(serviceInfo,'message sent throufh queue');
      
      this.channel?.sendToQueue(
        rabbitMQConfig.queueName2,
        Buffer.from(message)
      );
    } catch (error) {
      throw new BadRequestError("Failed to send message" + error);
    }
  }
}
