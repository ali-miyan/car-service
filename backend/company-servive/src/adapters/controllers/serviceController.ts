import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import { AddServiceUseCase } from "../../usecases/addServiceUseCase";

export class ServiceController {
  constructor(private addServiceUseCase: AddServiceUseCase) {}

  async addService(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body);
    const {
      generalServiceId,
      companyId,
      selectedHours,
      experience,
      terms,
      basicSubService,
      standardSubService,
      premiumSubService,
    } = req.body;

    const { files } = req as any;

    try {
      const response = this.addServiceUseCase.execute(
        generalServiceId,
        companyId,
        selectedHours,
        experience,
        terms,
        basicSubService,
        standardSubService,
        premiumSubService,
        files
      );
      
      res.status(201).json({success:response});
    } catch (error) {
      next(error);
    }
  }
}
