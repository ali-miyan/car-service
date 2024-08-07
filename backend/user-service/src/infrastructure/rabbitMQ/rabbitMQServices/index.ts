import { CarRepository, ICarRepository } from "../../../repositories";
import { ProducerService } from "../rabbitMQConfig";
import { ConsumerService } from "./sentUserDetails";

export function createConsumerService(): ConsumerService {
  const carRepository: ICarRepository = new CarRepository();
  const producerService = new ProducerService()
    return new ConsumerService(carRepository,producerService);
}

export * from './sentUserDetails'
