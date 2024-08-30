import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from ".";
import { BadRequestError } from "tune-up-library";

export class ProducerService {
  private channel!: Channel;
  private maxRetries: number = 5;
  private retryDelay: number = 2000;

  constructor() {
    this.initWithRetry();
  }

  private async initWithRetry(attempt: number = 1): Promise<void> {
    try {
      const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(rabbitMQConfig.queueName2);
      await this.channel.assertQueue(rabbitMQConfig.queueName3);
      console.log('RabbitMQ connection established successfully');
    } catch (error) {
      console.error(`RabbitMQ connection failed on attempt ${attempt}. Error: ${error}`);
      if (attempt <= this.maxRetries) {
        console.log(`Retrying to connect to RabbitMQ in ${this.retryDelay / 1000} seconds...`);
        await this.delay(this.retryDelay);
        return this.initWithRetry(attempt + 1);
      } else {
        console.log(`Failed to connect to RabbitMQ after ${this.maxRetries} attempts. Exiting...`);
        process.exit(1);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async sendMessage(message: string) {
    try {
      this.channel.sendToQueue(rabbitMQConfig.queueName2, Buffer.from(message));
    } catch (error) {
      throw new BadRequestError("Error in RabbitMQ: " + error);
    }
  }

  public async sendRating(message: string) {
    try {
      this.channel.sendToQueue(rabbitMQConfig.queueName3, Buffer.from(message));
    } catch (error) {
      throw new BadRequestError("Error in RabbitMQ: " + error);
    }
  }
}
