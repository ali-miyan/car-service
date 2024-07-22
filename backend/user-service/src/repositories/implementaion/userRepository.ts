import { User } from "../../entities/userEntity";
import { IUserRepository } from "../interfaces";
import { userModel, IUserData } from "../../infrastructure/db/";
import { BadRequestError } from "tune-up-library";

export class UserRepository implements IUserRepository {
  async getAll(): Promise<IUserData[] | null> {
    try {
      return await userModel.find();
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }
  async getById(id: string): Promise<IUserData | null> {
    try {
      return await userModel.findOne({ _id: id });
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async updateStatus(id: string, data: object): Promise<void> {
    try {
      await userModel.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async updateImage(id: string, profileImg: string): Promise<void> {
    try {
      await userModel.findByIdAndUpdate(id, { profileImg }, { new: true });
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async updateCredentials(
    id: string,
    username: string,
    phone: null | number
  ): Promise<void> {
    try {
      await userModel.updateOne(
        { _id: id },
        { $set: { username, phone } }
      );
    } catch (error) {
      throw new Error("error in db");
    }
  }
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
