// userService/modules/producer/producer.service.ts
import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from ".";

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
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  public async sendMessage(message: string) {
    try {
      this.channel.sendToQueue(rabbitMQConfig.queueName2, Buffer.from(message));
      console.log(`User message sent: ${message}`);
    } catch (error) {
      console.log(error, "error while sending");
    }
  }
}
