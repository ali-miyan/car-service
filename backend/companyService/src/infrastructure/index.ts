import {
  startSlotGrpcServer,
  startServiceGrpcServer,
  startCompanyIdsGrpcServer,
} from "../infrastructure/grpc";
import { createConsumerService } from "./rabbitMQ/rabbitMQServices";

const initializeGrpcServices = () => {
  startCompanyIdsGrpcServer();
  startSlotGrpcServer();
  startServiceGrpcServer();
  createConsumerService();
};

export { initializeGrpcServices };

export * from "./db";
export * from "./services";
