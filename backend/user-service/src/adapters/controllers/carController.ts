import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import { AddCarUseCase } from "../../usecases";
import { GetCarByIdUseCase } from "../../usecases/getCarByIdUseCase";

export class CarController {
  constructor(
    private addCarUseCase: AddCarUseCase,
    private getCarById:GetCarByIdUseCase
) {}

  async addCar(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { vin, color, src, name } = req.body;    

    try {
      const response = this.addCarUseCase.execute(name,color,src,vin);
      res.status(201).json( response );
    } catch (error) {
      next(error);
    }
  }
  async getCar(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;    

    try {
      const response = this.getCarById.execute(id);
      res.status(201).json( response );
    } catch (error) {
      next(error);
    }
  }
}
