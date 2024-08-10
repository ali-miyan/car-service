import { User } from "../../entities";
import { IUserInterface } from "../interfaces";
import { userModel } from "../../infrastructure/db";
import { BadRequestError } from "tune-up-library";

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
  async findOne(carId: string): Promise<any> {
    try {
      console.log(carId);
      
      const user = await userModel.findOne({
        where:{carId}
      });
      if (!user) {
        throw new BadRequestError("Cannot get user details");
      }
      return user.get({ plain: true });
    } catch (error) {
      console.log(error);
      throw new Error("Error in db: " + error);
    }
  }
}
