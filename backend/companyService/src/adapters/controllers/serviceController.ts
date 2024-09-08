import { NextFunction, Request, Response } from "express";
import {
  AddServiceUseCase,
  GetServiceUseCase,
  ServiceStatusUseCase,
  DeleteServiceUseCase,
  GetAllServicesUseCase,
  GetSingleServicesUseCase,
} from "../../usecases";

export class ServiceController {
  constructor(
    private addServiceUseCase: AddServiceUseCase,
    private serviceStatusUseCase: ServiceStatusUseCase,
    private getServiceUseCase: GetServiceUseCase,
    private deleteServiceUseCase: DeleteServiceUseCase,
    private getEveryServiceUseCase: GetAllServicesUseCase,
    private getSignleServicesUseCase: GetSingleServicesUseCase
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
      const page = parseInt(req.query.page as string, 6) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 6) || 6;

      const response = await this.getEveryServiceUseCase.execute(
        service,
        company,
        search,
        sort,
        page,
        pageSize
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

    try {
      const response = await this.deleteServiceUseCase.execute(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

}
