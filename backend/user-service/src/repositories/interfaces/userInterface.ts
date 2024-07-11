import { User } from "../../entities";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: number): Promise<boolean | null>;
  updatePassword(email: string, newPassword: string): Promise<boolean>;
  save(user: User): Promise<User>;
}
