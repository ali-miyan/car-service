import { NextFunction, Request, Response } from "express";
import { BookingUseCase, GetBookingUseCase, GetSingleBookingUseCase } from "../usecases";
import { UpdateBookingStatusUseCase } from "../usecases/updateBookingUseCase";

export class BookingController {
  constructor(
    private bookingRepository: BookingUseCase,
    private updateBookingRepository: UpdateBookingStatusUseCase,
    private getBookingUseCase:GetBookingUseCase,
    private getSingleBookingUseCase:GetSingleBookingUseCase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const {
      userId,
      serviceId,
      companyId,
      date,
      address,
      payment,
      servicePlace,
      typeOfPackage,
      totalPrice,
      carId,
      generalServiceId,
    } = req.body;

    console.log(req.body,'reqboddy');
    

    try {
      const response = await this.bookingRepository.execute(
        userId,
        companyId,
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

    try {
      await this.updateBookingRepository.execute(id);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  async getBookings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      const data = await this.getBookingUseCase.execute(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async getSingleBooking(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      const data = await this.getSingleBookingUseCase.execute(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
