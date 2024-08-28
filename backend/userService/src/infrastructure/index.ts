import { createConsumerService, createWalletConsumerService } from "./rabbitMQ";
import { connectKafkaProducer, disconnectKafkaProducer } from "./kafka";

export const initializeServices = async () => {
  createConsumerService();
  createWalletConsumerService();
  await connectKafkaProducer();
};

export const shutdownServices = async () => {
  await disconnectKafkaProducer();
};

export * from "./db";
export * from "./kafka";
export * from "./rabbitMQ";
export * from "./services";
