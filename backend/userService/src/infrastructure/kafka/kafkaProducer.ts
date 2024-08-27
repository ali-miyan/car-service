import { kafkaProducer } from ".";

export class KafkaService {
  async sendMessage(topic: string, message: object): Promise<void> {
    try {
        console.log('message sent to topic -- ' + topic);
        
      await kafkaProducer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch (error) {
      console.error("Failed to send Kafka message", error);
      throw new Error("Failed to send Kafka message");
    }
  }
}
