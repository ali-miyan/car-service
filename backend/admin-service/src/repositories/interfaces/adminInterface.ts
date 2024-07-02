import { Admin } from "../../entities/adminEntity";

export interface IAdminRepository {
  save(admin: Admin): Promise<Admin>;
}
