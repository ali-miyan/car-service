import { BadRequestError } from "tune-up-library";
import { kafkaProducer } from ".";

export class KafkaService {
  async sendMessage(topic: string, message: object): Promise<void> {
    try {
      console.log("message sent to topic -- " + topic);

      await kafkaProducer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch (error) {
      throw new BadRequestError("error in kafka" + error);
    }
  }
}
