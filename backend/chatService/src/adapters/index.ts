import { ChatController } from "../adapters/chatController";
import {
  GetBookedUsersUseCase,
  GetChatUseCase,
  GetCompanyChatUseCase,
} from "../usecases";
import { ChatRepository } from "../repositories";

const chatRepository = new ChatRepository();

const getChatUseCase = new GetChatUseCase(chatRepository);
const getCompanyChatUseCase = new GetCompanyChatUseCase(chatRepository);
const getBookedUsersUseCase = new GetBookedUsersUseCase();

const chatController = new ChatController(
  getChatUseCase,
  getCompanyChatUseCase,
  getBookedUsersUseCase
);

export { chatController };
