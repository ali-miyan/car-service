import { BadRequestError } from "tune-up-library";
import { IBookingRepository, IRedisRepository } from "../repositories";

export class GetLiveLocationUseCase {
  constructor(
    private redisRepository: IRedisRepository,
    private bookingRepository: IBookingRepository
  ) {}

  async execute(id: string): Promise<any> {
    const data = await this.redisRepository.get(`order:${id}`);
    const data2 = await this.bookingRepository.getSingle(id);
    console.log(data, "live location");
    if (!data) {
      throw new BadRequestError("cant get live location");
    }

    console.log(data2, "booki");

    const parsed = JSON.parse(data);

    return {
      liveLocation: parsed,
      userLocation: {
        latitude: (data2 as any).address.latitude,
        longitude: (data2 as any).address.longitude,
      },
    };
  }
}
