import { NextFunction, Request, Response } from "express";
import {
  RegisterUseCase,
  GetApprovalUseCase,
  LoginUseCase,
  UpdateStatusUseCase,
  GetByIdUseCase,
  GetApprovedCompanyUseCase,
  GetDashboardUseCase,
} from "../../usecases";
import { BadRequestError } from "tune-up-library";

export class CompanyController {
  constructor(
    private registerCompanyUseCase: RegisterUseCase,
    private loginCompany: LoginUseCase,
    private getApproval: GetApprovalUseCase,
    private getcompany: GetByIdUseCase,
    private updateStatus: UpdateStatusUseCase,
    private getApprovedCompany: GetApprovedCompanyUseCase,
    private getDashboardUseCase: GetDashboardUseCase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {
      ownerName,
      companyName,
      year,
      contact1,
      contact2,
      email,
      licenseNumber,
      licenseExpiry,
      password,
      description,
      address,
    } = req.body;

    const { files } = req as any;

    try {
      const response = await this.registerCompanyUseCase.execute(
        ownerName,
        companyName,
        year,
        contact1,
        contact2,
        email,
        licenseNumber,
        licenseExpiry,
        password,
        files,
        description,
        address
      );

      if (response.success) {
        res.cookie("companyToken", response.token, {
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("companyRefreshToken", response.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
      const response = await this.loginCompany.execute(email, password);

      if (response.success) {
        res.cookie("companyToken", response.token, {
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("companyRefreshToken", response.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getApprovels(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.getApproval.execute();

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;

      const response = await this.getcompany.execute(id);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getApproved(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.getApprovedCompany.execute();

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateCompanyStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const status = req.body;
    console.log(req.params, "dsdsd", req.body);

    if (!id || !status) {
      throw new BadRequestError("id not found");
    }

    try {
      const response = await this.updateStatus.execute(id, status);
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
      const response = await this.getDashboardUseCase.execute();
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
