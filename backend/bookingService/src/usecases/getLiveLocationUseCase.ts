import { BadRequestError } from "tune-up-library";
import { IRedisRepository } from "../repositories";

export class GetLiveLocationUseCase {
  constructor(private redisRepository: IRedisRepository) {}

  async execute(id: string): Promise<any> {
    try {
      const data = await this.redisRepository.get(`order:${id}`);

      console.log(data, "live location");

      if (!data) {
        throw new BadRequestError(
          "Can't get live location for order ID: " + id
        );
      }

      return {
        liveLocation: JSON.parse(data),
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
