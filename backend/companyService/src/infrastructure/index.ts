import { BadRequestError } from "tune-up-library";
import {
  startSlotGrpcServer,
  startServiceGrpcServer,
  startCompanyIdsGrpcServer,
} from "../infrastructure/grpc";
import { createConsumerService } from "./rabbitMQ/rabbitMQServices";

const initializeGrpcServices = () => {
  try {
    startCompanyIdsGrpcServer();
    startSlotGrpcServer();
    startServiceGrpcServer();
    createConsumerService();
  } catch (error) {
    throw new BadRequestError("error while starting" + error);
  }
};

export { initializeGrpcServices };

export * from "./db";
export * from "./services";
