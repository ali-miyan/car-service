import { Rating } from "../../entities";
import { IRatingRepository } from "../interfaces";
import { ratingModal, RatingDocument } from "../../infrastructure/db";
import { BadRequestError } from "tune-up-library";

export class RatingRepository implements IRatingRepository {

  async find(_id: string): Promise<RatingDocument | null> {
    try {
      const rating = await ratingModal.findOne({ _id });
      if (!rating) return null;
      return rating;
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }

  async getAll(): Promise<RatingDocument[] | null> {
    try {
      const rating = await ratingModal.find();
      return rating;
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }

  async getApproved(): Promise<RatingDocument[] | null> {
    try {
      const rating = await ratingModal.find({
        isApproved: "accepted",
        isBlocked: false,
      } as any);
      return rating;
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }

  async getById(id: string): Promise<RatingDocument[] | null> {
    try {
      const rating = await ratingModal.find({ serviceId: id });
      return rating;
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }

  async updateStatus(id: string, data: object): Promise<void> {
    try {
      await ratingModal.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }
  async save(company: Rating): Promise<Rating> {
    try {
      const rating = new ratingModal(company);
      await rating.save();
      return rating;
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }
  
}
