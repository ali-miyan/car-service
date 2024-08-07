export interface IUserData {
  _id: string;
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
  _id: string;
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

  constructor({ _id, userId, name, color, src, vin }: IUserData) {
    this._id = _id;
    this.userId = userId;
    this.name = name;
    this.color = color;
    this.src = src;
    this.vin = vin;
  }
}
