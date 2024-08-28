import { NextFunction, Request, Response } from "express";
import {
  DeleteServiceUseCase,
  GetServiceUseCase,
  ServiceUseCase,
} from "../../usecases";
import { UpdateServiceUseCase } from "../../usecases";

export class ServiceController {
  constructor(
    private serviceRepository: ServiceUseCase,
    private getServiceRepository: GetServiceUseCase,
    private deleteServiceRepository: DeleteServiceUseCase,
    private updateStatusRepository: UpdateServiceUseCase
  ) {}

  async addService(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    const { serviceName, description, services } = req.body;
    const { originalname, buffer, mimetype } = (req as any).file;

    try {
      const company = await this.serviceRepository.execute(
        serviceName,
        description,
        services,
        originalname,
        buffer,
        mimetype
      );

      res.status(201).json(company);

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

      const { companyId } = req.query;

      const company = await this.getServiceRepository.execute(
        companyId as string | undefined
      );

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

    try {
      const response = await this.deleteServiceRepository.execute(id);
      res.status(201).json(response);

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
      const response = await this.updateStatusRepository.execute(id, status);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
