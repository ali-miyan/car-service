import { Router } from "express";
import { ChatController } from "../../adapters/chatController";
import { GetBookedUsersUseCase, GetChatUseCase, GetCompanyChatUseCase } from "../../usecases";
import { ChatRepository } from "../../repositories";

const router = Router();

const chatRepository = new ChatRepository();

const getChatUseCase = new GetChatUseCase(chatRepository);
const getCompanyChatUseCase = new GetCompanyChatUseCase(chatRepository);
const getBookedUsersUseCase = new GetBookedUsersUseCase(chatRepository);

const chatController = new ChatController(
  getChatUseCase,
  getCompanyChatUseCase,
  getBookedUsersUseCase
);

router.get("/get-chat/:userId/:companyId", (req, res, next) =>
  chatController.getChat(req, res, next)
);
router.get("/get-company-chat/:companyId", (req, res, next) =>
  chatController.getCompanyChat(req, res, next)
);
router.get("/get-booked-users/:companyId", (req, res, next) =>
  chatController.getBookedUSersChat(req, res, next)
);

export default router;
