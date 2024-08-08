import amqplib, { Channel, Connection } from "amqplib";
import {  rabbitMQConfig } from "../rabbitMQConfig";
import { IUserInterface } from "../../../repositories";
import { SaveUserDetailsUseCase } from "../../../usecases";

export class ConsumerService {
  private channel!: Channel;
  private userRepository:SaveUserDetailsUseCase;

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
          console.log(message.content.toString(),'this is consumed from queue2');
          const userDetails = message.content.toString();
          this.channel.ack(message);

          

          await this.userRepository.execute(JSON.parse(userDetails));
        } catch (error) {
          console.log(error);
          this.channel.nack(message, false, true);
        }
      }
    });
  }
}
