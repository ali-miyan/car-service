import { Booking } from "../../entities";
import { bookingModel } from "../../infrastructure/db";

export interface IBookingRepository {
    save(booking: Booking): Promise<bookingModel>;
    findById(id: string): Promise<bookingModel>;
    updateStatus(id: string): Promise<void>;
    getAll(id:string): Promise<bookingModel[]>;
    getSingle(id:string): Promise<bookingModel>;
}
