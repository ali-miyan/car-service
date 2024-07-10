import { Service } from "../../entities";
import { IServiceRepository } from "../interfaces";
import serviceModel, {
  ServiceDocument,
} from "../../infrastructure/db/models/serviceModel";

export class ServiceRepository implements IServiceRepository {
  async getAll(): Promise<any> {
    const service = await serviceModel.find();
    return service;
  }
  async getById(id: string): Promise<Service | null> {
    const service = await serviceModel.findOne({ _id: id });
    return service;
  }
  async deleteOne(id: string): Promise<any> {
    const user = await serviceModel.deleteOne({ _id: id });
    return user;
  }
  async updateStatus(id: string, data: object): Promise<void> {
    try {
      
      const service = await serviceModel.findByIdAndUpdate(
        id,
        data ,
        { new: true }
      );

      console.log(service);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async save(services: Service): Promise<any> {
    try {
      const newServices = new serviceModel(services);
      return await newServices.save();
    } catch (error) {
      console.log(error);
    }
  }
}
