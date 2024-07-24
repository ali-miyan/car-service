import { Service } from "../../entities";
import { IServiecRepository } from "../interfaces";
import { IService,serviceModal } from "../../infrastructure/db";

export class ServiceRepository implements IServiecRepository {
  async find(email: string): Promise<IService | null> {
    try {
      const newService = await serviceModal.findOne({ email: email });
      if (!newService) return null;
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async getAll(companyId:string): Promise<IService[] | null> {
    try {
      const newService = await serviceModal.find({companyId});
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async getSingle(_id:string): Promise<IService | null> {
    try {
      const newService = await serviceModal.findOne({_id}).populate('companyId');
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async getEveryService(): Promise<IService[] | null> {
    try {
      const newService = await serviceModal.find().populate('companyId');
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async getById(id:string): Promise<IService | null> {
    try {
      const newService =await serviceModal.findOne({_id:id});
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }

  async deleteOne(id: string): Promise<any> {
    try {
      const user = await serviceModal.deleteOne({ _id: id });
      return user;
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async updateStatus(id: string, data: object): Promise<void> {
    try {
      await serviceModal.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async save(service: Service): Promise<void> {
    try {
      const newService = new serviceModal(service);
      await newService.save();
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
}
