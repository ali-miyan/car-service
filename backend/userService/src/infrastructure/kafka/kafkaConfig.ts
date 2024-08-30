import { Kafka } from "kafkajs";
import { BadRequestError } from "tune-up-library";

const kafka = new Kafka({
  clientId: "user-service",
  brokers: ["kafka:9092"],
});

export const kafkaProducer = kafka.producer();

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

export const connectKafkaProducer = async () => {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      await kafkaProducer.connect();
      console.log("Kafka producer connected successfully");
      return;
    } catch (error) {
      attempt++;
      console.log(
        `Failed to connect to Kafka (attempt ${attempt}/${MAX_RETRIES}):`,
        error
      );
      if (attempt >= MAX_RETRIES) {
        console.log(
          "Maximum retry attempts reached. Could not connect to Kafka."
        );
        throw new BadRequestError("error in kafka" + error);
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};

export const disconnectKafkaProducer = async () => {
  try {
    await kafkaProducer.disconnect();
    console.log("Kafka producer disconnected successfully");
  } catch (error) {
    console.log("Failed to disconnect Kafka producer:", error);
  }
};
