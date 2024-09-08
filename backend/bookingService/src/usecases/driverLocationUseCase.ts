import { io } from "..";
import { IRedisRepository } from "../repositories";
import { BadRequestError } from "tune-up-library";

export class UpdateDriverLocationUseCase {
  constructor(private redisRepository: IRedisRepository) {}

  async execute(
    orderId: string,
    latitude: number,
    longitude: number
  ): Promise<void> {
    try {
      if (!orderId || latitude === undefined || longitude === undefined) {
        throw new BadRequestError("Invalid input");
      }

      io.emit("location_updated", {
        latitude,
        longitude,
      });

      const key = `order:${orderId}`;
      const value = JSON.stringify({
        latitude,
        longitude,
      });

      await this.redisRepository.store(key, value, 86400);
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
