import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import { GetRatingsUseCase, UpdateRatingUseCase } from "../../usecases";

export class RatingController {
  constructor(
    private getRatingUseCase: GetRatingsUseCase,
    private updateRatingUseCase: UpdateRatingUseCase
  ) {}

  async getRatings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;


    if (!id) {
      throw new BadRequestError("id not found");
    }

    try {
      const response = await this.getRatingUseCase.execute(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async updateRating(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { stat, userId, _id } = req.body;

    if (!stat || !userId || !_id) {
      throw new BadRequestError("invalid input");
    }

    try {
      const response = await this.updateRatingUseCase.execute(_id,stat,userId);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
