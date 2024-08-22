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
  async addToWallet(
    userId: string,
    amount: string,
    stat: string
  ): Promise<void> {
    try {
      const userDoc = await userModel.findById(userId);

      if (!userDoc) {
        throw new Error("User not found");
      }

      let refundAmountNumber = parseFloat(amount);

      if (stat === "debit") {
        refundAmountNumber = -refundAmountNumber;
      } else if (stat !== "credit") {
        throw new Error("Invalid transaction type");
      }

      userDoc.wallet += refundAmountNumber;

      const transactionType = refundAmountNumber > 0 ? "credit" : "debit";

      userDoc.walletHistory.push({
        transactionType,
        amount: Math.abs(refundAmountNumber),
        date: new Date(),
      });

      // Save the user document
      await userDoc.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error updating the wallet in the database");
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
      await userModel.updateOne({ _id: id }, { $set: { username, phone } });
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async findByEmail(email: string): Promise<IUserData | null> {
    try {
      const user = await userModel.findOne({ email });
      if (!user) return null;
      return user;
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

  async getUserDetails(
    id: string
  ): Promise<{ username: string; email: string; phone: number | null } | null> {
    try {
      const user = await userModel.findById(id).select("username email phone");
      if (!user) return null;
      return {
        username: user.username,
        email: user.email,
        phone: user.phone,
      };
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }
  async getAllUsersCount(): Promise<number> {
    try {
      return await userModel.countDocuments({});
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }
  async getMonthlyUsers(): Promise<{ month: string; count: number }[]> {
    try {
      const result = await userModel
        .aggregate([
          {
            $project: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
          },
          {
            $group: {
              _id: { month: "$month", year: "$year" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: { "_id.year": 1, "_id.month": 1 },
          },
          {
            $project: {
              _id: 0,
              month: "$_id.month",
              year: "$_id.year",
              count: 1,
            },
          },
        ])
        .exec();

      return result.map((item) => ({
        month: `${item.year}-${item.month.toString().padStart(2, "0")}`,
        count: item.count,
      }));
    } catch (error) {
      console.log(error);
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
