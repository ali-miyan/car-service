import { RatingRepository } from "../../../repositories";
import { AddRatingUseCase } from "../../../usecases";
import { RabbitMQService } from "../rabbitMQConfig";
import { ConsumerService2 } from "./getServiceDetails";
import { ConsumerService } from "./saveUserRating";

export function createConsumerService(): {
  saveUserRatingConsumer: ConsumerService;
  newConsumer: ConsumerService2;
} {
  const userRepository = new RatingRepository();
  const saveUserDetailsUseCase = new AddRatingUseCase(userRepository);
  const saveUserRatingConsumer = new ConsumerService(saveUserDetailsUseCase);

  const rabbitMQService = new RabbitMQService();
  const newConsumer = new ConsumerService2(rabbitMQService);

  return { saveUserRatingConsumer, newConsumer };
}

export * from "./saveUserRating";
