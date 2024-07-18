import { Service } from "../../entities";
import { IService } from "../../infrastructure/db/models";

export interface IServiecRepository {
  find(email: string): Promise<IService | null>;
  getById(id: string): Promise<IService | null>;
  updateStatus(id: string,data:object): Promise<void>;
  getAll(): Promise<IService[] | null>;
  save(comapny: Service): Promise<void>;
}
