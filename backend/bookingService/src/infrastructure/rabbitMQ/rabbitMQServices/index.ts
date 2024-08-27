import { UserRepository } from "../../../repositories";
import { SaveUserDetailsUseCase } from "../../../usecases";
import { ConsumerService } from "./saveUserDetails";

export function createConsumerService(): ConsumerService {
  const userRepository = new UserRepository();
  const saveUserDetailsUseCase = new SaveUserDetailsUseCase(userRepository);
  return new ConsumerService(saveUserDetailsUseCase);
}

export * from "./saveUserDetails";
