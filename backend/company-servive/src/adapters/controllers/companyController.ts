import { NextFunction, Request, Response } from "express";
import { RegisterUseCase } from "../../usecases/registerUseCase";

export class CompanyController {
  constructor(private registerCompany: RegisterUseCase) {}

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
        files
      );
      res.status(201).json(company);
    } catch (error) {
      next(error);
    }
  }
}
