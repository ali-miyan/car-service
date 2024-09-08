import { BadRequestError } from "tune-up-library";
import { RatingRepository } from "../repositories";
import { Rating } from "../entities";
import { AddRatingParams } from "../utils/interfaces";

export class AddRatingUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    serviceId,
    username,
    email,
    profileImg,
    userId,
    stars,
    review,
  }: AddRatingParams): Promise<any> {
    try {
      const rating = new Rating({
        serviceId,
        userId,
        username,
        email,
        profileImg:profileImg ?? null,
        stars,
        review,
        likes: { count: 0, userIds: [] },
        dislikes: { count: 0, userIds: [] },
      });

      await this.ratingRepository.save(rating);
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
