import { BadRequestError } from "tune-up-library";
import { IRedisRepository } from "../repositories";

export class GetLiveLocationUseCase {
  constructor(private redisRepository: IRedisRepository) {}

  async execute(id: string): Promise<any> {
    const data = await this.redisRepository.get(`order:${id}`);
    console.log(data, "live location");
    if (!data) {
      throw new BadRequestError("cant get live location");
    }

    return {
      liveLocation: JSON.parse(data),
    };
  }
}
