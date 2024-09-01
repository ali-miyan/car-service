import { UserRepository } from "../../../repositories";
import { SaveUserDetailsUseCase } from "../../../usecases";
import { ConsumerService2 } from "./saveServiceDetails";
import { ConsumerService } from "./saveUserDetails";

export function createConsumerService() {
  const userRepository = new UserRepository();
  const saveUserDetailsUseCase = new SaveUserDetailsUseCase(userRepository);

  {
    new ConsumerService(saveUserDetailsUseCase), new ConsumerService2();
  }
}

export * from "./saveUserDetails";
