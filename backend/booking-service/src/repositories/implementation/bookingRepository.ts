import { Booking } from "../../entities";
import { IBookingRepository } from "../interfaces";
import { bookingModel } from "../../infrastructure/db";

export class BookingRepository implements IBookingRepository {
  async save(booking: Booking): Promise<bookingModel> {
    try {
      const newBooking = await bookingModel.create(booking);
      return newBooking;
    } catch (error) {
      console.log(error);
      throw new Error("Error in db: " + error);
    }
  }
  async findById(id: string): Promise<bookingModel> {
    try {
      const booking = await bookingModel.findByPk(id);
      return booking as bookingModel;
    } catch (error) {
      console.log(error);
      throw new Error("Error in db: " + error);
    }
  }

  async updateStatus(id: string): Promise<void> {
    try {
      const booking = await bookingModel.findByPk(id);

      if (!booking) {
        throw new Error("Booking not found");
      }

      booking.status = "confirmed";
      await booking.save();

    } catch (error) {
      console.error("Error updating booking status:", error);
      throw new Error("Error in db: " + error);
    }
  }

  async getAll(companyId: string): Promise<bookingModel[]> {
    try {
      const bookings = await bookingModel.findAll({
        where: { companyId }  
      });
      return bookings as bookingModel[];
    } catch (error) {
      console.error("Error retrieving all bookings for company:", error);
      throw new Error("Error in db: " + error);
    }
  }
  async getSingle(id: string): Promise<bookingModel> {
    try {
      const bookings = await bookingModel.findOne({
        where: { id }  
      });
      return bookings as bookingModel;
    } catch (error) {
      console.error("Error retrieving  bookings for company:", error);
      throw new Error("Error in db: " + error);
    }
  }
}
