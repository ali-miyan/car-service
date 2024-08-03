import { NextFunction, Request, Response } from "express";
import { BookingUseCase } from "../usecases";

export class BookingController {
  constructor(private bookingRepository: BookingUseCase) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const {
      userId,
      generalServiceId,
      serviceId,
      date,
      servicePlace,
      serviceType,
      typeOfPackage,
      totalPrice,
    } = req.body;

    console.log(req.body);

    try {
      const response = await this.bookingRepository.execute(userId,generalServiceId,serviceId,date,servicePlace,serviceType,typeOfPackage,totalPrice);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
