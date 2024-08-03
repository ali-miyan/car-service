export interface IBookingData {
    userId: string;
    generalServiceId: string;
    serviceId: string;
    date: string;
    serviceType: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    typeOfPackage: string;
    servicePlace: string;
    totalPrice: number;
  }
  
  export class Booking {
    userId: string;
    serviceId: string;
    generalServiceId: string;
    date: string;
    serviceType: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    typeOfPackage: string;
    servicePlace: string;
    totalPrice: number;
  
    constructor({
      userId,
      generalServiceId,
      serviceId,
      date,
      serviceType,
      status,
      typeOfPackage,
      servicePlace,
      totalPrice,
    }: IBookingData) {
      this.userId = userId;
      this.generalServiceId = generalServiceId;
      this.serviceId = serviceId;
      this.date = date;
      this.serviceType = serviceType;
      this.status = status;
      this.typeOfPackage = typeOfPackage;
      this.servicePlace = servicePlace;
      this.totalPrice = totalPrice;
    }
  }
  