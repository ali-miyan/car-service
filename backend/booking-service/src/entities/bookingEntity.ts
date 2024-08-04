export interface IBookingData {
  id?:string;
  userId: string;
  companyId:string;
  generalServiceId: string;
  serviceId: string;
  date: string;
  payment: string;
  address: object;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  typeOfPackage: string;
  servicePlace: string;
  carId:string;
  totalPrice: number;
}

export class Booking {
  id?:string;
  userId: string;
  companyId:string;
  serviceId: string;
  generalServiceId: string;
  date: string;
  payment: string;
  address: object;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  typeOfPackage: string;
  servicePlace: string;
  carId:string;
  totalPrice: number;

  constructor({
    id,
    userId,
    companyId,
    generalServiceId,
    serviceId,
    date,
    payment,
    address,
    status,
    typeOfPackage,
    servicePlace,
    carId,
    totalPrice,
  }: IBookingData) {
    this.id = id
    this.userId = userId;
    this.companyId = companyId;
    this.generalServiceId = generalServiceId;
    this.serviceId = serviceId;
    this.date = date;
    this.payment = payment;
    this.address = address;
    this.status = status;
    this.typeOfPackage = typeOfPackage;
    this.servicePlace = servicePlace;
    this.carId = carId
    this.totalPrice = totalPrice;
  }
}
