import { Booking } from "../../entities";
import { bookingModel } from "../../infrastructure/db";

export interface IBookingRepository {
    save(booking: Booking): Promise<bookingModel>;
    findById(id: string): Promise<bookingModel>;
    getAll(id:string): Promise<bookingModel[]>;
    getSingle(orderId:string): Promise<bookingModel>;
    getUsersOrder(userId:string): Promise<bookingModel[]>;
    updateBookingStatus(orderId:string,status:string): Promise<void>;
    cancelBooking(orderId:string,reason:string): Promise<void>;
    getMontlyRevenue(companyId:string): Promise<bookingModel[]>;
    getTotalRevenue(companyId:string): Promise<number>;
    getBookingCount(companyId:string): Promise<number>;
    getMostBookedServicePlace(companyId:string): Promise<any>;
}
