import { User } from "../../../../entities/userEntity";

export interface IUserRepository {
  findByEmail(email: string): Promise<boolean | null>;
  findByPhone(phone: number): Promise<boolean | null>;
  save(user: User): Promise<User>;
}
