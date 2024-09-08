import { BadRequestError } from "tune-up-library";
import {
  CarRepository,
  UserRepository,
  ICarRepository,
  IUserRepository,
} from "../../../repositories";
import { WalletUseCase } from "../../../usecases";
import { ProducerService } from "../rabbitMQConfig";
import { WalletConsumerService } from "./saveWalletDetails";
import { ConsumerService } from "./sentUserDetails";

export function createConsumerService(): ConsumerService {
  try {
    const carRepository: ICarRepository = new CarRepository();
    const producerService = new ProducerService();
    return new ConsumerService(carRepository, producerService);
  } catch (error) {
    throw new BadRequestError("error in rabbitmq" + error);
  }
}
export function createWalletConsumerService(): WalletConsumerService {
  try {
    const userRepository: IUserRepository = new UserRepository();
    const walletUseCase = new WalletUseCase(userRepository);
    return new WalletConsumerService(walletUseCase);
  } catch (error) {
    throw new BadRequestError("error in rabbitmq" + error);
  }
}

export * from "./sentUserDetails";
export * from "./saveWalletDetails";
