import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "user-service",
  brokers: ["localhost:9092"],
});

export const kafkaProducer = kafka.producer();

export const connectKafkaProducer = async () => {
  await kafkaProducer.connect();
};

export const disconnectKafkaProducer = async () => {
  await kafkaProducer.disconnect();
};
