import { BadRequestError } from "tune-up-library";
import { UserRepository } from "../../repositories";
import { EditUserUseCase } from "../../usecases";
import { KafkaService } from "./kafkaConsumer";

export function createKafkaConsumer(): KafkaService {
  try {
    
    const userRepository = new UserRepository();
    const editUserUseCase = new EditUserUseCase(userRepository);
    return new KafkaService(editUserUseCase);

  } catch (error) {
    throw new BadRequestError("erroe in kafka" + error);
  }
}

export * from "./kafkaConfig";
export * from "./kafkaConsumer";
