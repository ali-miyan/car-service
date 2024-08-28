import { createKafkaConsumer } from ".";
import { startUsersGrpcServer } from ".";
import { createConsumerService } from ".";
import { connectDB } from ".";

const initializeServices = async () => {
  try {
    await connectDB()
    await createKafkaConsumer().startConsuming();
    startUsersGrpcServer();
    createConsumerService();
  } catch (error) {
    console.error("Failed to initialize services:", error);
    process.exit(1);
  }
};

export { initializeServices };

export * from "./db";
export * from "./grpc";
export * from "./kafka";
export * from "./rabbitMQ";
export * from "./services";
