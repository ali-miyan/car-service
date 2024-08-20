import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import {
  AddServiceUseCase,
  GetServiceUseCase,
  ServiceStatusUseCase,
  DeleteServiceUseCase,
  GetAllServicesUseCase,
  GetSignleServicesUseCase,
} from "../../usecases";

export class ServiceController {
  constructor(
    private addServiceUseCase: AddServiceUseCase,
    private serviceStatusUseCase: ServiceStatusUseCase,
    private getServiceUseCase: GetServiceUseCase,
    private deleteServiceUseCase: DeleteServiceUseCase,
    private getEveryServiceUseCase: GetAllServicesUseCase,
    private getSignleServicesUseCase: GetSignleServicesUseCase
  ) {}

  async addService(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      _id,
      generalServiceId,
      companyId,
      selectedHours,
      terms,
      servicePlace,
      servicesPerDay,
      basicSubService,
      standardSubService,
      premiumSubService,
    } = req.body;

    const { files } = req as any;


    try {
      const response = this.addServiceUseCase.execute(
        _id,
        generalServiceId,
        companyId,
        selectedHours,
        servicePlace,
        servicesPerDay,
        terms,
        basicSubService,
        standardSubService,
        premiumSubService,
        files
      );

      res.status(201).json({ success: response });
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
    const status = req.body;

    if (!id) {
      throw new BadRequestError("id not found");
    }

    try {
      const response = await this.serviceStatusUseCase.execute(id, status);
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
      const { id } = req.params;

      const service = await this.getServiceUseCase.execute(id);
      res.status(201).json(service);
    } catch (error) {
      next(error);
    }
  }
  async getSingleServices(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const service = await this.getSignleServicesUseCase.execute(id);
      res.status(201).json(service);
    } catch (error) {
      next(error);
    }
  }
  async getAllServices(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = req.query.service as string | undefined;
      const company = req.query.company as string | undefined;
      const search = req.query.search as string | undefined;
      const sort = req.query.sort as string | undefined;
      const response = await this.getEveryServiceUseCase.execute(
        service,
        company,
        search,
        sort,
      );
      res.status(201).json(response);
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
