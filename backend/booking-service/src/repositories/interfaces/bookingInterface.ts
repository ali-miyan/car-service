import { Booking } from "../../entities";
import { bookingModel } from "../../infrastructure/db";

export interface IBookingRepository {
    save(booking: Booking): Promise<bookingModel>;
    findById(id: string): Promise<bookingModel>;
    updateStatus(id: string): Promise<void>;
    getAll(id:string): Promise<bookingModel[]>;
    getSingle(orderId:string): Promise<bookingModel>;
    getUsersOrder(userId:string): Promise<bookingModel[]>;
    updateBookingStatus(orderId:string,status:string): Promise<void>;
    getMontlyRevenue(companyId:string): Promise<bookingModel[]>;
}
