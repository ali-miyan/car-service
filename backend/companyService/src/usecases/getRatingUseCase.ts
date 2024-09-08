import { BadRequestError } from "tune-up-library";
import { IRatingRepository } from "../repositories";

export class GetRatingsUseCase {
  constructor(private ratingRepository: IRatingRepository) {}

  async execute(id: string): Promise<any> {
    try {
      const data = await this.ratingRepository.getById(id);
      if (!data) {
        throw new BadRequestError("Can't get ratings");
      }
      return data;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
