import { User } from "../../entities";
import { IUserData, } from "../../infrastructure/db";

export interface IUserRepository {
  getAll(): Promise<IUserData[] | null>;
  getById(id: string): Promise<IUserData | null>;
  addToWallet(userId: string, amount: string,stat:string): Promise<void>;
  updateStatus(id: string,data:object): Promise<void>;
  findByEmail(email: string): Promise<IUserData | null>;
  findByPhone(phone: number): Promise<boolean | null>;
  updateCredentials(id: string, username: string, phone: null | number ,profileImg: string | null): Promise<void>;
  updatePassword(email: string, newPassword: string): Promise<boolean>;
  getAllUsersCount(): Promise<number>;
  getMonthlyUsers(): Promise<{ month: string; count: number }[]>;
  save(user: User): Promise<User>;
}
