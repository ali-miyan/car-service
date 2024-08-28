import { Booking } from "../../entities";
import { IBookingRepository } from "../interfaces";
import { bookingModel, sequelize } from "../../infrastructure/db";
import { BookingStatus } from "../../schemas/Enums";

export class BookingRepository implements IBookingRepository {
  async save(booking: Booking): Promise<bookingModel> {
    try {
      const newBooking = await bookingModel.create(booking);
      return newBooking;
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async findById(id: string): Promise<bookingModel> {
    try {
      const booking = await bookingModel.findByPk(id);
      return booking as bookingModel;
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async updateBookingStatus(
    orderId: string,
    status: BookingStatus
  ): Promise<void> {
    try {
      const booking = await bookingModel.findByPk(orderId);

      if (!booking) {
        throw new Error("Booking not found");
      }

      booking.status = status;
      await booking.save();
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async getAll(companyId: string): Promise<bookingModel[]> {
    try {
      const bookings = await bookingModel.findAll({
        where: { companyId },
      });
      return bookings as bookingModel[];
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async getSingle(id: string): Promise<bookingModel> {
    try {
      const bookings = await bookingModel.findOne({
        where: { id },
      });
      return bookings as bookingModel;
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async getUsersOrder(userId: string): Promise<bookingModel[]> {
    try {
      const bookings = await bookingModel.findAll({
        where: { userId },
      });
      return bookings as bookingModel[];
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async getMontlyRevenue(companyId: string): Promise<bookingModel[]> {
    try {
      return await bookingModel.findAll({
        attributes: [
          [
            sequelize.fn("date_trunc", "month", sequelize.col("createdAt")),
            "month",
          ],
          [sequelize.fn("sum", sequelize.col("totalPrice")), "totalRevenue"],
        ],
        where: {
          companyId,
        },
        group: [
          sequelize.fn("date_trunc", "month", sequelize.col("createdAt")),
        ],
        order: [
          [
            sequelize.fn("date_trunc", "month", sequelize.col("createdAt")),
            "ASC",
          ],
        ],
      });
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async getTotalRevenue(companyId: string): Promise<number> {
    try {
      const result = await bookingModel.findOne({
        attributes: [
          [sequelize.fn("sum", sequelize.col("totalPrice")), "totalRevenue"],
        ],
        where: {
          companyId,
        },
      });

      const totalRevenue = result?.get("totalRevenue") as number;
      return totalRevenue || 0;
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async getBookingCount(companyId: string): Promise<number> {
    try {
      const count = await bookingModel.count({
        where: {
          companyId,
        },
      });

      return count;
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async cancelBooking(orderId: string, reason: string): Promise<void> {
    try {
      const booking = await bookingModel.findByPk(orderId);

      if (!booking) {
        throw new Error("Booking not found");
      }

      await booking.update({
        status: "Booking Cancelled",
        cancelReason: reason,
      });

      console.log(`Booking with ID ${orderId} has been cancelled.`);
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }

  async getMostBookedServicePlace(companyId: string): Promise<any> {
    try {
      const result = await bookingModel.findAll({
        attributes: [
          "servicePlace",
          [
            sequelize.fn("count", sequelize.col("servicePlace")),
            "bookingCount",
          ],
        ],
        where: {
          companyId,
        },
        group: ["servicePlace"],
        order: [[sequelize.fn("count", sequelize.col("servicePlace")), "DESC"]],
        limit: 1,
      });

      return result[0] || null;
    } catch (error) {
      throw new Error("Error in db: " + error);
    }
  }
}
