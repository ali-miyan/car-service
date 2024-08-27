import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import {
  AddCarUseCase,
  DeleteCarUseCase,
  GetCarByIdUseCase,
  GetOneCarUseCase
} from "../../usecases";

export class CarController {
  constructor(
    private addCarUseCase: AddCarUseCase,
    private getCarByIdUseCase: GetCarByIdUseCase,
    private deleteCarUseCase: DeleteCarUseCase,
    private getOneCarUseCase: GetOneCarUseCase
  ) {}

  async addCar(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, vin, color, src, name } = req.body;

    try {
      const response = await this.addCarUseCase.execute(
        userId,
        name,
        color,
        src,
        vin
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getCar(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      const response = await this.getCarByIdUseCase.execute(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getOneCar(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      const response = await this.getOneCarUseCase.execute(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async deleteCar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    console.log(id);

    try {
      const response = await this.deleteCarUseCase.execute(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
