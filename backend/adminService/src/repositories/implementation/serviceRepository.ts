import { Service } from "../../entities";
import { IServiceRepository } from "../interfaces";
import { serviceModel } from "../../infrastructure/db/";
import { BadRequestError } from "tune-up-library";

export class ServiceRepository implements IServiceRepository {
  
  async getAll(ids: string[] | null): Promise<any> {
    try {
      const query = ids ? { _id: { $nin: ids } } : {};
      const services = await serviceModel.find(query);
      return services;
    } catch (error) {
      throw new BadRequestError("Error in db" + error);
    }
  }

  async getById(id: string): Promise<Service | null> {
    try {
      const service = await serviceModel.findOne({ _id: id });
      return service;
    } catch (error) {
      throw new BadRequestError("Error in db" + error);
    }
  }

  async deleteOne(id: string): Promise<any> {
    try {
      const user = await serviceModel.deleteOne({ _id: id });
      return user;
    } catch (error) {
      throw new BadRequestError("Error in db" + error);
    }
  }

  async updateStatus(id: string, data: object): Promise<void> {
    try {
      await serviceModel.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestError("Error in db" + error);
    }
  }

  async save(services: Service): Promise<any> {
    try {
      const newServices = new serviceModel(services);
      return await newServices.save();
    } catch (error) {
      throw new BadRequestError("Error in db" + error);
    }
  }
}
