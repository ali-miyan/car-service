import { BadRequestError } from "tune-up-library";
import { IRatingRepository } from "../repositories";

export class GetRatingsUseCase {
  constructor(private ratingepository: IRatingRepository) {}

  async execute(id: string): Promise<any> {
    const data = await this.ratingepository.getById(id);
    if (!data) {
      throw new BadRequestError("cant get ratings");
    }
    return data;
  }
}
