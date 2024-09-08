import { BadRequestError } from "tune-up-library";
import { ChatRepository } from "../../repositories";
import { EditUserUseCase } from "../../usecases";
import { KafkaService } from "./kafkaConsumer";

export function createKafkaConsumer(): KafkaService {
  try {
    const userRepository = new ChatRepository();
    const editUserUseCase = new EditUserUseCase(userRepository);

    return new KafkaService(editUserUseCase);
  } catch (error) {
    throw new BadRequestError("error in kafka" + error);
  }
}

export * from "./kafkaConfig";
export * from "./kafkaConsumer";
