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
    if (!orderId || !latitude || !longitude) {
      throw new BadRequestError("Invalid input");
    }

    io.emit("location_updated", {
      latitude,
      longitude
    });

    const key = `order:${orderId}`;
    const value = JSON.stringify({
      latitude,
      longitude,
    });

    await this.redisRepository.store(key, value, 86400);
  }
}
