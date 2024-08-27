import { Rating } from "../../entities";
import { RatingDocument } from "../../infrastructure/db/models";

export interface IRatingRepository {
  find(email: string): Promise<RatingDocument | null>;
  getById(id: string): Promise<RatingDocument[] | null>;
  updateStatus(id: string,data:object): Promise<void>;
  getAll(): Promise<RatingDocument[] | null>;
  getApproved(): Promise<RatingDocument[] | null>;
  save(rating: Rating): Promise<Rating>;
}
