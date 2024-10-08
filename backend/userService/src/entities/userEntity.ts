export interface IUserData {
  _id?: any;
  username: string;
  email: string;
  phone: number | null;
  profileImg?: string | null;
  password: string;
  wallet: number;
}

export class User {
  _id?: any;
  username: string;
  email: string;
  phone: number | null;
  profileImg?: string | null;
  password: string;
  wallet: number;

  constructor({
    _id,
    username,
    email,
    phone,
    password,
    wallet,
    profileImg,
  }: IUserData) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.profileImg = profileImg;
    this.password = password;
    this.wallet = wallet;
  }
}
