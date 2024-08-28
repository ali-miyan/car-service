import { User } from "../../entities";
import { userModel } from "../../infrastructure/db";

export interface IUserInterface {
  save(user: User): Promise<userModel>;
  findOne(id: string): Promise<userModel>;
  editUser(userId: string, username: string, phone: string | null, profileImg: string | null ): Promise<void>;
  getBookedUserDetails(companyId: string): Promise<any>;
}
