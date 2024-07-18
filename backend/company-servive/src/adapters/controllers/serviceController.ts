import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import { AddServiceUseCase, GetServiceUseCase, ServiceStatusUseCase,DeleteServiceUseCase } from "../../usecases";

export class ServiceController {
  constructor(
    private addServiceUseCase: AddServiceUseCase,
    private serviceStatusUseCase:ServiceStatusUseCase,
    private getServiceUseCase: GetServiceUseCase,
    private deleteServiceUseCase:DeleteServiceUseCase
  ) {}

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
      terms,
      servicePlace,
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
        servicePlace,
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
  async updateStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    const { id } = req.params;
    const status = req.body
    console.log(req.params,'dsdsd',req.body);
    

    if (!id) {
      throw new BadRequestError("id not found");
    }

    try {
      const response = await this.serviceStatusUseCase.execute(id,status);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getService(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      console.log(req.cookies);
      
      
      const company = await this.getServiceUseCase.execute();
      res.status(201).json(company);
    } catch (error) {
      next(error);
    }
  }

  async deleteService(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    console.log(req.params,'dsdsd');
    

    if (!id) {
      throw new BadRequestError("id not found");
    }

    try {
      const response = await this.deleteServiceUseCase.execute(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
