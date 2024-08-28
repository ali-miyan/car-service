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
  console.log("user consumer is running");
  const carRepository: ICarRepository = new CarRepository();
  const producerService = new ProducerService();
  return new ConsumerService(carRepository, producerService);
}
export function createWalletConsumerService(): WalletConsumerService {
  console.log("wallet consumer is running");

  const userRepository: IUserRepository = new UserRepository();
  const walletUseCase = new WalletUseCase(userRepository);
  return new WalletConsumerService(walletUseCase);
}

export * from "./sentUserDetails";
export * from "./saveWalletDetails";
