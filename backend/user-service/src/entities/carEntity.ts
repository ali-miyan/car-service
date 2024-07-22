export interface ICarData {
  _id?: any;
  userId: string;
  name: string;
  color: string;
  src: string;
  vin: string;
}

export class Car {
  _id?: any;
  userId: string;
  name: string;
  color: string;
  src: string;
  vin: string;

  constructor({ _id, userId, name, color, src, vin }: ICarData) {
    this._id = _id;
    this.userId = userId;
    this.name = name;
    this.color = color;
    this.src = src;
    this.vin = vin;
  }
}
