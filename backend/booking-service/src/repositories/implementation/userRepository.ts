import { User } from "../../entities";
import { IUserInterface } from "../interfaces";
import { userModel } from "../../infrastructure/db";

export class UserRepository implements IUserInterface {
  async save(user: User): Promise<userModel> {
    try {
      const newBooking = await userModel.create(user);
      return newBooking;
    } catch (error) {
      console.log(error);
      throw new Error("Error in db: " + error);
    }
  }

}
