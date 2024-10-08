import { NextFunction, Request, Response } from "express";
import { RegisterUseCase } from "../../usecases/adminUseCase";

export class AdminController {
  constructor(private registerCompany: RegisterUseCase) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    const { email, password } = req.body;

    try {
      const response = await this.registerCompany.execute(email, password);

      if (response.success) {
        res.cookie("adminToken", response.token, {
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("adminRefreshToken", response.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
