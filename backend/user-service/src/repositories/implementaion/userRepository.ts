import { User } from "../../entities/userEntity";
import { IUserRepository } from "../interfaces";
import { userModel } from "../../infrastructure/db/";
import { BadRequestError } from "tune-up-library";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await userModel.findOne({ email });
      if (!user) return null;
      return new User(user);
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }
  async findByPhone(phone: number): Promise<boolean | null> {
    try {
      const user = await userModel.findOne({ phone });
      if (!user) return null;
      return true;
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }

  async updatePassword(email: string, newPassword: string): Promise<boolean> {
    try {
      const user = await userModel.findOne({ email });
      if (!user) return false;
      user.password = newPassword;
      await user.save();
      return true;
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }

  async save(user: User): Promise<User> {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return user;
    } catch (error) {
      console.log(error);
      
      throw new BadRequestError("error in db");
    }
  }
}
