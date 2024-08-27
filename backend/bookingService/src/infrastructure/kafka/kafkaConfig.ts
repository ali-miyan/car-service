import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "user-service-consumer",
  brokers: ["localhost:9092"],
});

export const kafkaConsumer = kafka.consumer({ groupId: "user-service-group-1" });

export const connectKafkaConsumer = async () => {
  await kafkaConsumer.connect();
};

export const disconnectKafkaConsumer = async () => {
  await kafkaConsumer.disconnect();
};
