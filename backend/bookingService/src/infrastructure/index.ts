import { BadRequestError } from "tune-up-library";
import { createKafkaConsumer } from ".";
import { startUsersGrpcServer } from ".";
import { createConsumerService } from ".";
import { connectDB } from ".";

const initializeServices = async () => {
  try {
    await connectDB()
    startUsersGrpcServer();
    createConsumerService();
    await createKafkaConsumer().startConsuming();
  } catch (error) {
    console.error("Failed to initialize services:", error);
    throw new BadRequestError("error while starting servers" + error)    
  }
};

export { initializeServices };

export * from "./db";
export * from "./grpc";
export * from "./kafka";
export * from "./rabbitMQ";
export * from "./services";
