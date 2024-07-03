export interface IUserData {
  username: string;
  email: string;
  phone: number | null;
  password: string;
}

export class User {
  username: string;
  email: string;
  phone: number | null;
  password: string;

  constructor({ username, email, phone, password }: IUserData) {
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
