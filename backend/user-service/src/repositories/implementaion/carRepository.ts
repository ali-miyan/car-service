import { Car } from "../../entities";
import { ICarRepository } from "../interfaces";
import { carModel, ICarData } from "../../infrastructure/db/";
import { BadRequestError } from "tune-up-library";
import mongoose from "mongoose";

export class CarRepository implements ICarRepository {
  async getAll(): Promise<ICarData[] | null> {
    try {
      return await carModel.find();
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }
  async getById(id: string): Promise<ICarData[] | null> {
    try {
      return await carModel.find({ userId: id });
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getOne(id: string): Promise<ICarData | null> {
    try {
      const car = await carModel
        .findOne({ _id: id })
        .select("userId name color src vin");
      return (car as ICarData).toObject();
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const checl = await carModel.deleteOne({ _id: id });
      console.log(checl, "check");
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async updateStatus(id: string, data: object): Promise<void> {
    try {
      await carModel.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async updateImage(id: string, profileImg: string): Promise<void> {
    try {
      await carModel.findByIdAndUpdate(id, { profileImg }, { new: true });
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
      await carModel.updateOne({ _id: id }, { $set: { username, phone } });
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async getUsersDetails(userId: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequestError("Invalid userId");
      }
  
      const userObjectId = new mongoose.Types.ObjectId(userId);
  
      const userDetails = await carModel.findOne({ userId: userObjectId })
        .select("_id name color src vin")
        .populate({
          path: 'userId',
          select: 'username email phone'
        });
  
      return userDetails;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new BadRequestError("Error in DB");
    }
  }
  async save(user: Car): Promise<void> {
    try {
      const newUser = new carModel(user);
      await newUser.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }
}
