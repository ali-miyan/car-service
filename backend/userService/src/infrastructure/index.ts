import { createConsumerService, createWalletConsumerService } from "./rabbitMQ";
import { connectKafkaProducer, disconnectKafkaProducer } from "./kafka";
import { BadRequestError } from "tune-up-library";

export const initializeServices = async () => {
  try {
    createConsumerService();
    createWalletConsumerService();
    await connectKafkaProducer();
  } catch (error) {
    throw new BadRequestError("error while starting" + error);
  }
};

export const shutdownServices = async () => {
  await disconnectKafkaProducer();
};

export * from "./db";
export * from "./kafka";
export * from "./rabbitMQ";
export * from "./services";
