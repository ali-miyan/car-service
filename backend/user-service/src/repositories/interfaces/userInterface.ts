import { User } from "../../entities";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: number): Promise<boolean | null>;
  save(user: User): Promise<User>;
}
