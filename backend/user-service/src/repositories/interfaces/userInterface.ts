import { User } from "../../entities";
import { UserDocument } from "../../infrastructure/db";

export interface IUserRepository {
  getAll(): Promise<UserDocument[] | null>;
  getById(id: string): Promise<UserDocument | null>;
  updateStatus(id: string,data:object): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: number): Promise<boolean | null>;
  updatePassword(email: string, newPassword: string): Promise<boolean>;
  save(user: User): Promise<User>;
}
