import { User } from "../../entities";
import { IUserData, } from "../../infrastructure/db";

export interface IUserRepository {
  getAll(): Promise<IUserData[] | null>;
  getById(id: string): Promise<IUserData | null>;
  updateStatus(id: string,data:object): Promise<void>;
  findByEmail(email: string): Promise<IUserData | null>;
  findByPhone(phone: number): Promise<boolean | null>;
  updateImage(id: string, profileImg: string): Promise<void>;
  updateCredentials(id: string, username: string, phone: null | number): Promise<void>;
  updatePassword(email: string, newPassword: string): Promise<boolean>;
  getAllUsersCount(): Promise<number>;
  getMonthlyUsers(): Promise<{ month: string; count: number }[]>;
  save(user: User): Promise<User>;
}
