import { Service } from "../../entities";
import { IService } from "../../infrastructure/db/models";

export interface IServiceRepository {
  find(email: string): Promise<IService | null>;
  getById(id: string): Promise<IService | null>;
  updateStatus(id: string,data:object): Promise<void>;
  getAll(companyId:string): Promise<IService[] | null>;
  getSingle(_id:string): Promise<IService | null>;
  getEveryService(): Promise<IService[] | null>;
  save(comapny: Service): Promise<void>;
}
