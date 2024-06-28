import { User } from "../../../entities/userEntity";
import { IUserRepository } from "../interfaces/userInterface";
import UserModel from "../../../infrastructure/db/models/userModel";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<boolean | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return true;
  }
  async findByPhone(phone: number): Promise<boolean | null> {
    const user = await UserModel.findOne({ phone });
    if (!user) return null;
    return true;
  }

  async save(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();
    return user;
  }
}
