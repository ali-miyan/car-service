import { ChatRepository } from '../../repositories';
import { EditUserUseCase } from '../../usecases';
import { KafkaService } from './kafkaConsumer';

export function createKafkaConsumer(): KafkaService {
    console.log('kafka is running....');
    const userRepository = new ChatRepository()
    const editUserUseCase = new EditUserUseCase(userRepository)
    
    return new KafkaService(editUserUseCase);
  }


export * from './kafkaConfig'
export * from './kafkaConsumer'
