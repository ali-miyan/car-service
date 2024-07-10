import { User } from "../../entities/userEntity";
import { IUserRepository } from "../interfaces";
import UserModel from "../../infrastructure/db/models/userModel";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return null;
      return new User(user);
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async findByPhone(phone: number): Promise<boolean | null> {
    try {
      const user = await UserModel.findOne({ phone });
      if (!user) return null;
      return true;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async save(user: User): Promise<User> {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      return user;
    } catch (error) {
      throw new Error("error in db");
    }
  }
}
