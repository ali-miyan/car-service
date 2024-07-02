import { Admin } from "../../entities";

export interface IAdminRepository {
  save(admin: Admin): Promise<Admin>;
}
