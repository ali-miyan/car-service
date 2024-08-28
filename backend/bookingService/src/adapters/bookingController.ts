import { NextFunction, Request, Response } from "express";
import {
  BookingUseCase,
  GetBookingUseCase,
  GetLiveLocationUseCase,
  GetDashboardUseCase,
  GetSingleBookingUseCase,
  UpdateDriverLocationUseCase,
  UpdateStatusUseCase,
  CancelBookingUseCase,
  HandleStripeUseCase,
  RefundUseCase,
} from "../usecases";
import { GetUsersBookingUseCase } from "../usecases/getUsersBookingUseCase";

export class BookingController {
  constructor(
    private bookingRepository: BookingUseCase,
    private getBookingUseCase: GetBookingUseCase,
    private getSingleBookingUseCase: GetSingleBookingUseCase,
    private updateStatusUseCase: UpdateStatusUseCase,
    private getUsersBookingUseCase: GetUsersBookingUseCase,
    private updateDriverLocationUseCase: UpdateDriverLocationUseCase,
    private getLiveLocationUseCase: GetLiveLocationUseCase,
    private getDashboardUseCase: GetDashboardUseCase,
    private cancelBookingUseCase: CancelBookingUseCase,
    private handleStripeUseCase: HandleStripeUseCase,
    private refundUseCase: RefundUseCase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {

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

    const { orderId, status } = req.body;

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
  async refundToUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    const { userId, orderId, refundAmount } = req.body;

    try {
      const data = await this.refundUseCase.execute(
        userId,
        orderId,
        refundAmount
      );
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
      const data = await this.getLiveLocationUseCase.execute(id);
      res.status(200).json(data);

    } catch (error) {
      next(error);
    }
  }
  async getMonthlyRevenue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    const { id } = req.params;

    try {
      const data = await this.getDashboardUseCase.execute(id);
      res.status(200).json(data);

    } catch (error) {
      next(error);
    }
  }
  async handleStripe(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    const stripeEvents = req.body;

    try {
      const data = await this.handleStripeUseCase.execute(stripeEvents);
      res.status(200).json(data);

    } catch (error) {
      next(error);
    }
  }
  async cancelBooking(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    const { orderId, reason } = req.body;

    try {
      const data = await this.cancelBookingUseCase.execute(orderId, reason);
      res.status(200).json(data);
      
    } catch (error) {
      next(error);
    }
  }
}
