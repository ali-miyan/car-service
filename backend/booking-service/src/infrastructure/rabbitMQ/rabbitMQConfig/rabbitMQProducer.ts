import amqplib, { Channel, Connection } from 'amqplib';
import { rabbitMQConfig } from '.';

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
      console.error('Failed to initialize ProducerService:', error);
    }
  }

  public async sendMessage(message: string) {
    await this.initializationPromise;
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }
    try {
      this.channel.sendToQueue(rabbitMQConfig.queueName1, Buffer.from(message));
      console.log(`Order message sent: ${message}`);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }
}
