import { NextFunction, Request, Response } from "express";
import { BookingUseCase } from "../usecases";
import { UpdateBookingStatusUseCase } from "../usecases/updateBookingUseCase";

export class BookingController {
  constructor(
    private bookingRepository: BookingUseCase,
    private updateBookingRepository: UpdateBookingStatusUseCase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const {
      userId,
      serviceId,
      date,
      address,
      payment,
      servicePlace,
      typeOfPackage,
      totalPrice,
      carId,
      generalServiceId,
    } = req.body;

    console.log(req.body);

    try {
      const response = await this.bookingRepository.execute(
        userId,
        generalServiceId,
        serviceId,
        date,
        payment,
        servicePlace,
        address,
        typeOfPackage,
        carId,
        totalPrice
      );

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
    const { id } = req.body;

    console.log(req.body, "id gotted");

    try {
      await this.updateBookingRepository.execute(id);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
