import { NextFunction, Request, Response } from "express";
import {
  BookingUseCase,
  GetBookingUseCase,
  GetLiveLocationUseCase,
  GetSingleBookingUseCase,
  UpdateDriverLocationUseCase,
  UpdateStatusUseCase,
} from "../usecases";
import { UpdateBookingStatusUseCase } from "../usecases/updateBookingUseCase";
import { GetUsersBookingUseCase } from "../usecases/getUsersBookingUseCase";

export class BookingController {
  constructor(
    private bookingRepository: BookingUseCase,
    private updateBookingRepository: UpdateBookingStatusUseCase,
    private getBookingUseCase: GetBookingUseCase,
    private getSingleBookingUseCase: GetSingleBookingUseCase,
    private updateStatusUseCase: UpdateStatusUseCase,
    private getUsersBookingUseCase: GetUsersBookingUseCase,
    private updateDriverLocationUseCase: UpdateDriverLocationUseCase,
    private getLiveLocationUseCase: GetLiveLocationUseCase
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

    console.log(req.body, "reqboddy");

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

  async updateBooking(
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
  async updateStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { orderId, status } = req.body;
    console.log(req.body, "reqbody");

    try {
      await this.updateStatusUseCase.execute(orderId, status);
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
  async getUsersBooking(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      const data = await this.getUsersBookingUseCase.execute(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async updateDriversLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { orderId, latitude, longitude } = req.body;
    console.log(req.body, "reqqestr body");

    try {
      await this.updateDriverLocationUseCase.execute(
        orderId,
        latitude,
        longitude
      );
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  async getLiveLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    try {
      const data  = await this.getLiveLocationUseCase.execute(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
