import { Service } from "../../entities";
import { IServiceRepository } from "../interfaces";
import { IService, serviceModal } from "../../infrastructure/db";

export class ServiceRepository implements IServiceRepository {
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
  async getAll(companyId: string): Promise<IService[] | null> {
    try {
      const newService = await serviceModal.find({ companyId });
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async getSingle(_id: string): Promise<IService | null> {
    try {
      const newService = await serviceModal
        .findOne({ _id })
        .populate("companyId");
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async getTotalServices(): Promise<number> {
    try {
      return await serviceModal.countDocuments({})
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async getPackageDetails(
    serviceId: string,
    packageName: "basic" | "standard" | "premium"
  ) {
    try {
      const service = await (serviceModal as any)
        .findOne({ _id: serviceId })
        .populate({
          path: "companyId",
          select: "companyName logo address.latitude address.longitude contact1 contact2",
        });
      if (!service) {
        throw new Error("service is null");
      }
      const packageData = service ? service[`${packageName}Package`] : null;

      return {
        package: packageData,
        company: {
          name: service.companyId?.companyName,
          image: service.companyId?.logo,
          latitude: service.companyId?.address.latitude,
          longitude: service.companyId?.address.longitude,
          contact1: service.companyId?.contact1,
          contact2: service.companyId?.contact2,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error in db");
    }
  }

  async getEveryService(): Promise<IService[] | null> {
    try {
      const newService = await serviceModal
        .find({ isBlocked: false })
        .populate("companyId");
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }
  async getById(id: string): Promise<IService | null> {
    try {
      const newService = await serviceModal.findOne({ _id: id });
      return newService;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }

  async checkSlotAvailabilityInDb(id: string): Promise<boolean> {
    try {
      const service = await serviceModal.findOne({ _id: id });
      if (!service) {
        return false;
      }
      const availableSlots = parseInt(service.servicesPerDay, 10);
      if (isNaN(availableSlots) || availableSlots <= 0) {
        return false;
      }
      service.servicesPerDay = (availableSlots - 1).toString();
      await service.save();
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("Error in db");
    }
  }

  async getGeneralServiceIdsByCompanyId(companyId: string): Promise<object[]> {
    try {
      const services = await serviceModal.find(
        { companyId },
        { generalServiceId: 1 }
      );
      return services.map((service) => service.generalServiceId);
    } catch (error) {
      console.error("Error retrieving generalServiceIds:", error);
      throw new Error("Error in db");
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
      const { _id, ...serviceData } = service;

      const newService = _id
        ? await serviceModal.findByIdAndUpdate(_id, serviceData, {
            new: true,
            upsert: true,
          })
        : new serviceModal(service);

      await newService.save();
    } catch (error) {
      console.error("Error saving service:", error);
      throw new Error("Error in db");
    }
  }
}
