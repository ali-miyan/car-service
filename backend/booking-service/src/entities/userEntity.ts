export interface IUserData {
  id?: string;
  carId: string;
  userId: {
    _id: string;
    username: string;
    email: string;
    phone: string | null;
  };
  name: string;
  color: string;
  src: string;
  vin: string;
}

export class User {
  id?: string;
  carId: string;
  userId: {
    _id: string;
    username: string;
    email: string;
    phone: string | null;
  };
  name: string;
  color: string;
  src: string;
  vin: string;

  constructor({ id, carId, userId, name, color, src, vin }: IUserData) {
    this.id = id;
    this.carId = carId;
    this.userId = userId;
    this.name = name;
    this.color = color;
    this.src = src;
    this.vin = vin;
  }
}
