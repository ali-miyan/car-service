import { NextFunction, Request, Response } from "express";
import { RegisterUseCase } from "../../usecases/adminUseCase";

export class AdminController {
  constructor(private registerCompany: RegisterUseCase) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const {
      email,
      password,
    } = req.body;

    console.log(req.body);
    
    try {
      const company = await this.registerCompany.execute(
        email,
        password,
      );
      res.status(201).json(company);
    } catch (error) {
      next(error);
    }
  }
}
