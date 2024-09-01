import { Kafka } from "kafkajs";
import { BadRequestError } from "tune-up-library";

const kafka = new Kafka({
  clientId: "user-service-consumer-1",
  brokers: ["kafka-service:9092"],
});

export const kafkaConsumer = kafka.consumer({
  groupId: "user-service-group-1",
});

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

export const connectKafkaConsumer = async () => {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      await kafkaConsumer.connect();
      console.log("Kafka consumer connected successfully");
      return;
    } catch (error) {
      attempt++;
      console.log(
        `Failed to connect to Kafka consumer (attempt ${attempt}/${MAX_RETRIES}):`,
        error
      );
      if (attempt >= MAX_RETRIES) {
        console.log(
          "Maximum retry attempts reached. Could not connect to Kafka consumer."
        );
        throw new BadRequestError("error in kafka " + error);
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};

export const disconnectKafkaConsumer = async () => {
  try {
    await kafkaConsumer.disconnect();
    console.log("Kafka consumer disconnected successfully");
  } catch (error) {
    console.error("Failed to disconnect Kafka consumer:", error);
  }
};
