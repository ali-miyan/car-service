import { BadRequestError } from "tune-up-library";
import {
  IUserRepository,
} from "../repositories";
import { ProducerService } from "../infrastructure/rabbitMQ";

export class AddRatingUseCase {
  constructor(
    private userRepository: IUserRepository,
    private rabbitMQService:ProducerService
) {}
  async execute(
    stars:number,
    review: string,
    userId:string,
    serviceId:string
  ): Promise<any> {

    if (!stars || !review || !serviceId) {
      throw new BadRequestError("Invalid input");
    }

    const userDetails = await this.userRepository.getById(userId);

    const userData= JSON.stringify({
        serviceId,
        userId,
        username: userDetails?.username,
        email: userDetails?.email,
        profileImg: userDetails?.profileImg,
        stars,
        review
      });

    await this.rabbitMQService.sendRating(userData)


    return {success:true}

  }
}
