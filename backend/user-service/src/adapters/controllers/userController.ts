import { NextFunction, Request, Response } from "express";
import {
  SignupUseCase,
  LoginUseCase,
  VerifyOtpUseCase,
  GoogleUseCase,
  GetUsersUseCase,
  RequestPasswordUseCase,
  ResendOtpUseCase,
  ResetPasswordUseCase,
  UpdateStatusUseCase,
  GetUserByIdUseCase,
  UserImageUseCase,
  EditUSerUseCase,
  UpadtePasswordUseCase,
  AddRatingUseCase,
  GetAllUsersUseCase,
} from "../../usecases/index";
import { BadRequestError } from "tune-up-library";

export class UserController {
  constructor(
    private signupUseCase: SignupUseCase,
    private verifyOtpUseCase: VerifyOtpUseCase,
    private loginUseCase: LoginUseCase,
    private requestPassword: RequestPasswordUseCase,
    private googleUseCase: GoogleUseCase,
    private resendOtpUseCase: ResendOtpUseCase,
    private resetPasswordRepository: ResetPasswordUseCase,
    private getUsersUseCase: GetUsersUseCase,
    private updateStatusUseCase: UpdateStatusUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private userImageUseCase: UserImageUseCase,
    private editUSerUseCase: EditUSerUseCase,
    private upadtePasswordUseCase: UpadtePasswordUseCase,
    private addRatingUseCase: AddRatingUseCase,
    private getAllUsersUseCase:GetAllUsersUseCase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
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
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.getUsersUseCase.execute();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.getUserByIdUseCase.execute(id as string);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const status = req.body;

    if (!id) {
      throw new BadRequestError("id or status not found");
    }

    try {
      const response = await this.updateStatusUseCase.execute(id, status);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    const { id } = req.body;
    const file = req.file;

    if (!id || !file) {
      throw new BadRequestError("ID or file not found");
    }

    const { originalname, buffer, mimetype } = file;

    try {
      const response = await this.userImageUseCase.execute(id, {
        originalname,
        buffer,
        mimetype,
      });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async editUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id, username, phone } = req.body;

    try {
      const response = await this.editUSerUseCase.execute(id, username, phone);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId, currentPassword, newPassword, confirmNewPassword } =
      req.body;

    try {
      const response = await this.upadtePasswordUseCase.execute(
        userId,
        currentPassword,
        newPassword,
        confirmNewPassword
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async addRating(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { rating, reviewText,serviceId } = req.body;
    const { user } = (req as any).user;
    try {
      const response = await this.addRatingUseCase.execute(rating as number, reviewText as string,user as string,serviceId as string);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.getAllUsersUseCase.execute();
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
