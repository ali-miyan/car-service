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
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value ? message.value.toString() : "";
          this.editUserUseCase.execute(JSON.parse(value));
        },
      });
    } catch (error) {
      console.log(error, "error in kafka");
    }
  }

  async stopConsuming(): Promise<void> {
    await disconnectKafkaConsumer();
  }
}
