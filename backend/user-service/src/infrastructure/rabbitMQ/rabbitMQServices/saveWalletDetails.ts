import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from "../rabbitMQConfig";
import { WalletUseCase } from "../../../usecases";

export class WalletConsumerService {
  private channel!: Channel;
  private walletUseCase: WalletUseCase;

  constructor(walletUseCase: WalletUseCase) {
    this.walletUseCase = walletUseCase;
    this.init();
  }

  private async init() {
    const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(rabbitMQConfig.queueName4);
    this.startConsuming();
  }

  private startConsuming() {
    this.channel.consume(rabbitMQConfig.queueName4, async (message) => {
      if (message) {
        try {
          console.log(
            message.content.toString(),
            "this is consumed from booking wallet"
          );
          const userDetails = message.content.toString();
          this.channel.ack(message);

          await this.walletUseCase.execute(JSON.parse(userDetails));
        } catch (error) {
          console.log(error);
          this.channel.nack(message, false, true);
        }
      }
    });
  }
}
