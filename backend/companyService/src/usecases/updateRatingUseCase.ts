import { BadRequestError } from "tune-up-library";
import { IRatingRepository } from "../repositories";

export class UpdateRatingUseCase {
  constructor(private ratingRepository: IRatingRepository) {}

  async execute(_id: string, stat: string, userId: string): Promise<any> {
    const review = await this.ratingRepository.find(_id);

    if (!review) {
      throw new BadRequestError(`Rating with ID ${_id} not found.`);
    }

    let updatedLikes = [...review.likes.userIds];
    let updatedDislikes = [...review.dislikes.userIds];

    if (stat === "like") {
      if (updatedLikes.includes(userId)) {
        updatedLikes = updatedLikes.filter((id) => id !== userId);
        review.likes.count = Math.max(0, review.likes.count - 1);
      } else {
        if (updatedDislikes.includes(userId)) {
          updatedDislikes = updatedDislikes.filter((id) => id !== userId);
          review.dislikes.count = Math.max(0, review.dislikes.count - 1);
        }
        updatedLikes.push(userId);
        review.likes.count += 1;
      }
      review.likes.userIds = updatedLikes;
    } else if (stat === "dislike") {
      if (updatedDislikes.includes(userId)) {
        updatedDislikes = updatedDislikes.filter((id) => id !== userId);
        review.dislikes.count = Math.max(0, review.dislikes.count - 1);
      } else {
        if (updatedLikes.includes(userId)) {
          updatedLikes = updatedLikes.filter((id) => id !== userId);
          review.likes.count = Math.max(0, review.likes.count - 1);
        }
        updatedDislikes.push(userId);
        review.dislikes.count += 1;
      }
      review.dislikes.userIds = updatedDislikes;
    } else {
      throw new Error("Invalid stat");
    }

    await review.save();

    return { success: true };
  }
}
