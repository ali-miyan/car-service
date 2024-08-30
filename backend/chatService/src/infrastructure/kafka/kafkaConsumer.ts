import { BadRequestError } from "tune-up-library";
import {
  kafkaConsumer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
} from ".";
import { EditUserUseCase } from "../../usecases";

export class KafkaService {
  constructor(private editUserUseCase: EditUserUseCase) {}

  async startConsuming(): Promise<void> {
    try {
      await connectKafkaConsumer();
      await kafkaConsumer.subscribe({
        topic: "user-updated",
        fromBeginning: true,
      });
      await kafkaConsumer.run({
        eachMessage: async ({ topic, partition, message }:any) => {
          const value = message.value ? message.value.toString() : "";
          this.editUserUseCase.execute(JSON.parse(value));
        },
      });
    } catch (error) {
      console.log(error, "error in kafka");
      throw new BadRequestError("error in kafka" + error)
    }
  }

  async stopConsuming(): Promise<void> {
    await disconnectKafkaConsumer();
  }
}
