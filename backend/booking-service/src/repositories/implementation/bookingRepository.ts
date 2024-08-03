import { Booking } from "../../entities";
import { IBookingRepository } from "../interfaces";
import { bookingModel } from "../../infrastructure/db";

export class BookingRepository implements IBookingRepository {
  async save(booking: Booking): Promise<Booking> {
    try {
      const newBooking = await bookingModel.create(booking);
      return newBooking;
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }
}
