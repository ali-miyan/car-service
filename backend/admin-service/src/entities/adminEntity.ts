export interface IAdminData {
  email: string;
  password: string;
}

export class Admin {
  email: string;
  password: string;

  constructor({ email, password }: IAdminData) {
    this.email = email;
    this.password = password;
  }
}
