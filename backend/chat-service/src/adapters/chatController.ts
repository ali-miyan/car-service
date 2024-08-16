import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import { SaveChatUseCase } from "../usecases";

export class ChatController {
  constructor(private saveChatUseCase: SaveChatUseCase) {}

  async saveMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.saveChatUseCase.execute(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
