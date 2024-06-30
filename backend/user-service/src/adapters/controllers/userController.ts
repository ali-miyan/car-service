import { NextFunction, Request, Response } from "express";
import { SignupUseCase } from "../../usecases/signupUseCase";

export class UserController {
  constructor(private signupUseCase: SignupUseCase) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const { username, email, phone, password } = req.body;
    try {
      const user = await this.signupUseCase.execute(
        username,
        email,
        phone,
        password
      );
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
