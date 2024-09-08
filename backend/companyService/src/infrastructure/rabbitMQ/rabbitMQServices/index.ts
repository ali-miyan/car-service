import { BadRequestError } from "tune-up-library";
import { RatingRepository } from "../../../repositories";
import { AddRatingUseCase } from "../../../usecases";
import { RabbitMQService } from "../rabbitMQConfig";
import { ConsumerService2 } from "./getServiceDetails";
import { ConsumerService } from "./saveUserRating";

export function createConsumerService(): {
  saveUserRatingConsumer: ConsumerService;
  newConsumer: ConsumerService2;
} {
  try {
    const userRepository = new RatingRepository();
    const saveUserDetailsUseCase = new AddRatingUseCase(userRepository);
    const saveUserRatingConsumer = new ConsumerService(saveUserDetailsUseCase);

    const rabbitMQService = new RabbitMQService();
    const newConsumer = new ConsumerService2(rabbitMQService);

    return { saveUserRatingConsumer, newConsumer };
  } catch (error) {
    throw new BadRequestError("error in rabbitmq" + error);
  }
}

export * from "./saveUserRating";
