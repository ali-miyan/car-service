import { Service } from "../../entities";
import { IServiceRepository } from "../interfaces";
import serviceModel, {
  ServiceDocument,
} from "../../infrastructure/db/models/serviceModel";

export class ServiceRepository implements IServiceRepository {
  async getAll(): Promise<any> {
    try {
      const service = await serviceModel.find();
      return service;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getById(id: string): Promise<Service | null> {
    try {
      const service = await serviceModel.findOne({ _id: id });
      return service;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async deleteOne(id: string): Promise<any> {
    try {
      const user = await serviceModel.deleteOne({ _id: id });
      return user;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async updateStatus(id: string, data: object): Promise<void> {
    try {
      const service = await serviceModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      console.log(service);
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async save(services: Service): Promise<any> {
    try {
      const newServices = new serviceModel(services);
      return await newServices.save();
    } catch (error) {
      throw new Error("error in db");
    }
  }
}
