import { UserRepository } from "../../repositories";
import { EditUserUseCase } from "../../usecases";
import { KafkaService } from "./kafkaConsumer";

export function createKafkaConsumer(): KafkaService {
  const userRepository = new UserRepository();
  const editUserUseCase = new EditUserUseCase(userRepository);

  return new KafkaService(editUserUseCase);
}

export * from "./kafkaConfig";
export * from "./kafkaConsumer";
