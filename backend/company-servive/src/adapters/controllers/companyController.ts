import { NextFunction, Request, Response } from "express";
import { RegisterUseCase } from "../../usecases/registerUseCase";
import { LoginUseCase } from "../../usecases/loginUseCase";

export class CompanyController {
  constructor(
    private registerCompany: RegisterUseCase,
    private loginCompany: LoginUseCase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
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
      address,
    } = req.body;

    const { files } = req as any

    console.log(req.body,files);
    
    try {
      const company = await this.registerCompany.execute(
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
        address
      );
      res.status(201).json({success:true,company});
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {
      email,
      password,
    } = req.body;

    
    try {
      const company = await this.loginCompany.execute(
        email,
        password,
      );
      res.status(201).json({success:true,company});
    } catch (error) {
      next(error);
    }
  }
}
