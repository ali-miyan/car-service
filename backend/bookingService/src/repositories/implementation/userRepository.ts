import { User } from "../../entities";
import { IUserInterface } from "../interfaces";
import { userModel, sequelize } from "../../infrastructure/db";
import { BadRequestError } from "tune-up-library";
import { literal, QueryTypes } from "sequelize";

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
  async editUser(
    userId: string,
    username: string,
    phone: string | null,
    profileImg: string | null
  ): Promise<void> {
    try {
      let updateQuery = `UPDATE users SET "userId" =`;

      let jsonbUpdate = `"userId"`;

      if (username !== null) {
        jsonbUpdate = `jsonb_set(${jsonbUpdate}, '{username}', '"${username}"', true)`;
      }

      if (phone !== null) {
        jsonbUpdate = `jsonb_set(${jsonbUpdate}, '{phone}', '"${phone}"', true)`;
      }

      if (profileImg !== null) {
        jsonbUpdate = `jsonb_set(${jsonbUpdate}, '{profileImg}', '"${profileImg}"', true)`;
      }

      updateQuery += `${jsonbUpdate} WHERE "userId"->>'_id' = '${userId}'`;

      console.log(updateQuery, "final query");

      await sequelize.query(updateQuery);
    } catch (error) {
      console.log(error);
      throw new Error("Error in db: " + error);
    }
  }
  async findOne(carId: string): Promise<any> {
    try {
      const user = await userModel.findOne({
        where: { carId },
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

  async getAllBookedUsers(companyId: string): Promise<any> {
    try {
      console.log(companyId, "companyI99d");

      const query = `
      SELECT DISTINCT 
        "users"."userId"->>'_id' AS "userId",
        "users"."userId"->>'profileImg' AS "userImg",
        "users"."userId"->>'username' AS "username"
      FROM "users"
      INNER JOIN "bookings" ON "users"."userId"->>'_id' = "bookings"."userId"
      WHERE "bookings"."companyId" = :companyId
    `;

      return await sequelize.query(query, {
        replacements: { companyId },
        type: QueryTypes.SELECT,
      });
    } catch (error) {
      console.error("Error retrieving  bookings for company:", error);
      throw new Error("Error in db: " + error);
    }
  }
  async getBookedUserDetails(companyId: string): Promise<any> {
    try {
      console.log(companyId, "companyI99d");

      const query = `
      SELECT "users".*, "bookings".*
      FROM "users"
      INNER JOIN "bookings" ON "users"."userId"->>'_id' = "bookings"."userId"
      WHERE "bookings"."companyId" = :companyId
    `;

      return await sequelize.query(query, {
        replacements: { companyId },
        type: QueryTypes.SELECT,
      });
    } catch (error) {
      console.error("Error retrieving  bookings for company:", error);
      throw new Error("Error in db: " + error);
    }
  }
}
