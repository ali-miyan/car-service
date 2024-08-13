import { Service } from "../../entities";
import { ServiceDocument } from "../../infrastructure/db/models/serviceModel";

export interface IServiceRepository {
  getAll(ids: [string] | null): Promise<any>;
  getById(id: string): Promise<Service | null>;
  deleteOne(id: string): Promise<any>;
  updateStatus(id: string, data: object): Promise<any>;
  save(service: Service): Promise<ServiceDocument>;
}
