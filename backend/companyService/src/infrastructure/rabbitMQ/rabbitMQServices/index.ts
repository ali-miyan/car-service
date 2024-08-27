import { RatingRepository } from "../../../repositories";
import { AddRatingUseCase } from "../../../usecases";
import { ConsumerService } from "./saveUserRating";

export function createConsumerService(): ConsumerService {
  const userRepository = new RatingRepository();
  const saveUserDetailsUseCase = new AddRatingUseCase(userRepository);
  return new ConsumerService(saveUserDetailsUseCase);
}

export * from "./saveUserRating";
