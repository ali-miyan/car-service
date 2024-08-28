export interface IBookingData {
  id?: string;
  userId: string;
  companyId: string;
  generalServiceId: string;
  serviceId: string;
  date: string;
  payment: string;
  address: object;
  status:
    | "Booking Pending"
    | "Booking Confirmed"
    | "Driver Assigned"
    | "Driver En Route"
    | "Car Picked Up"
    | "Car Arrived at Service Center"
    | "Service In Progress"
    | "Service Completed"
    | "Car En Route Back"
    | "Car Delivered"
    | "Ready for Pickup"
    | "Booking Completed"
    | "Booking Cancelled";
  typeOfPackage: string;
  servicePlace: string;
  carId: string;
  totalPrice: number;
  cancelReason?: string;
}

export class Booking {
  id?: string;
  userId: string;
  companyId: string;
  serviceId: string;
  generalServiceId: string;
  date: string;
  payment: string;
  address: object;
  status:
    | "Booking Pending"
    | "Booking Confirmed"
    | "Driver Assigned"
    | "Driver En Route"
    | "Car Picked Up"
    | "Car Arrived at Service Center"
    | "Service In Progress"
    | "Service Completed"
    | "Car En Route Back"
    | "Car Delivered"
    | "Ready for Pickup"
    | "Booking Completed"
    | "Booking Cancelled";
  typeOfPackage: string;
  servicePlace: string;
  carId: string;
  totalPrice: number;
  cancelReason?: string;

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
    cancelReason,
  }: IBookingData) {
    this.id = id;
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
    this.carId = carId;
    this.totalPrice = totalPrice;
    this.cancelReason = cancelReason;
  }
}
