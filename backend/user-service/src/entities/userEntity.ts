export interface IUserData {
  _id?:any;
  username: string;
  email: string;
  phone: number | null;
  password: string;
}

export class  User {
  _id?:any;
  username: string;
  email: string;
  phone: number | null;
  password: string;

  constructor({_id, username, email, phone, password }: IUserData) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
