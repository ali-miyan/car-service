import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import { GetChatUseCase, GetCompanyChatUseCase,GetBookedUsersUseCase } from "../usecases";

export class ChatController {
  constructor(
    private getChatUseCase: GetChatUseCase,
    private getCompanyChatUseCase: GetCompanyChatUseCase,
    private getBookedUsersUseCase: GetBookedUsersUseCase,
  ) {}

  async getChat(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, companyId } = req.params;

      console.log(userId, companyId, "peatarams");

      const response = await this.getChatUseCase.execute(userId, companyId);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getCompanyChat(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { companyId } = req.params;

      const response = await this.getCompanyChatUseCase.execute(companyId);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getBookedUSersChat(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { companyId } = req.params;

      const response = await this.getBookedUsersUseCase.execute(companyId);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
