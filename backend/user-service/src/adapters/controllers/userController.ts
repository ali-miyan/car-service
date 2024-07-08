import { NextFunction, Request, Response } from "express";
import {
  SignupUseCase,
  LoginUseCase,
  VerifyOtpUseCase,
  GoogleUseCase,
} from "../../usecases/index";

export class UserController {
  constructor(
    private signupUseCase: SignupUseCase,
    private verifyOtpUseCase: VerifyOtpUseCase,
    private loginUseCase: LoginUseCase,
    private googleUseCase: GoogleUseCase
  ) {}

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


      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body);
    const { otp, email } = req.body;
    try {
      const user = await this.verifyOtpUseCase.execute(otp, email);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const user = await this.loginUseCase.execute(email, password);

      if(user){
        console.log('coookie setted');
        
        res.cookie("token",user.token)
      }
      

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async googleRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body,'accessed');
    const { access_token, token_type } = req.body;
    // try {
    //   const user = await this.googleUseCase.execute(access_token, token_type);
    //   res.status(200).json(user);
    // } catch (error) {
    //   next(error);
    // }
  }
}
