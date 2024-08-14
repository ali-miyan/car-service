import { Rating } from "../../entities";
import { IRatingRepository } from "../interfaces";
import { ratingModal,RatingDocument } from "../../infrastructure/db";

export class RatingRepository implements IRatingRepository {
  async find(email: string): Promise<RatingDocument | null> {
    try {
      const newCompany = await ratingModal.findOne({ email: email });
      if (!newCompany) return null;
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getAll(): Promise<RatingDocument[] | null> {
    try {
      const newCompany = await ratingModal.find();
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getApproved(): Promise<RatingDocument[] | null> {
    try {
      const newCompany = await ratingModal.find({isApproved:"accepted" , isBlocked:false});
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getById(id:string): Promise<RatingDocument[] | null> {
    try {
      const newCompany =await ratingModal.find({serviceId:id});
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async updateStatus(id: string, data: object): Promise<void> {
    try {
      await ratingModal.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async save(company: Rating): Promise<Rating> {
    try {
      const newCompany = new ratingModal(company);
      await newCompany.save();
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
}
