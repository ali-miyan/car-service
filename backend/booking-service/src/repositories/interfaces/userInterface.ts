import { User } from "../../entities";
import { userModel } from "../../infrastructure/db";

export interface IUserInterface {
    save(user: User): Promise<userModel>;
}
