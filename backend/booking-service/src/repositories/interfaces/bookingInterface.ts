import { Booking } from "../../entities";

export interface IBookingRepository {
  save(booking: Booking): Promise<Booking>;
}
