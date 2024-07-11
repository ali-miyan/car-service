import { NextFunction, Request, Response } from "express";
import {
  SignupUseCase,
  LoginUseCase,
  VerifyOtpUseCase,
  GoogleUseCase,
} from "../../usecases/index";
import { ResendOtpUseCase } from "../../usecases/resendOtpUseCase";
import { RequestPasswordUseCase } from "../../usecases/reqeustPasswordUseCase";
import { ResetPasswordUseCase } from "../../usecases/resetPasswordUseCase";

export class UserController {
  constructor(
    private signupUseCase: SignupUseCase,
    private verifyOtpUseCase: VerifyOtpUseCase,
    private loginUseCase: LoginUseCase,
    private requestPassword: RequestPasswordUseCase,
    private googleUseCase: GoogleUseCase,
    private resendOtpUseCase: ResendOtpUseCase,
    private resetPasswordRepository: ResetPasswordUseCase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const { username, email, password } = req.body;
    try {
      const user = await this.signupUseCase.execute(username, email, password);

      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }
  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body);
    const { email } = req.body;
    try {
      res.status(200).json({ success: true });
      await this.resendOtpUseCase.execute(email);
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
      const response = await this.verifyOtpUseCase.execute(otp, email);

      if (response.success) {
        res.cookie("userToken", response.token, {
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("userRefreshToken", response.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const response = await this.loginUseCase.execute(email, password);

      if (response.success) {
        res.cookie("userToken", response.token, {
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("userRefreshToken", response.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async forgetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body, "sqsq");
    const { email } = req.body;
    try {
      const response = await this.requestPassword.execute(email);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body, "sqsq");
    const { password, token } = req.body;
    try {
      const response = await this.resetPasswordRepository.execute(
        token,
        password
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async googleRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body, "accessed");
    const { access_token, token_type } = req.body;
    try {
      const response = await this.googleUseCase.execute(
        access_token,
        token_type
      );

      if (response.success) {
        res.cookie("userToken", response.token, {
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("userRefreshToken", response.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
