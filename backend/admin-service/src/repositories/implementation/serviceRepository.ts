import { Service } from "../../entities";
import { IServiceRepository } from "../interfaces";
import { serviceModel } from "../../infrastructure/db/";

export class ServiceRepository implements IServiceRepository {
  async getAll(ids: string[] | null): Promise<any> {
    try {
      const query = ids ? { _id: { $nin: ids } } : {};
      const services = await serviceModel.find(query);
      return services;
    } catch (error) {
      console.error("Error retrieving services:", error);
      throw new Error("Error in db");
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
