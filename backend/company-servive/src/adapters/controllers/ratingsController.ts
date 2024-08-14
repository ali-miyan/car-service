import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "tune-up-library";
import { GetRatingsUseCase } from "../../usecases";

export class RatingController {
  constructor(private getRatingUseCase: GetRatingsUseCase) {}

  async getRatings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    console.log(id,'ididid');
    

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
}
