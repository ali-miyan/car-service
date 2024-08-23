import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";
import { S3Service } from "../infrastructure/services";
import { KafkaService } from "../infrastructure/kafka";

export class EditUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private s3ServiceRepository: S3Service,
    private kafkaService: KafkaService
  ) {}

  async execute(
    id: string,
    username: string,
    phone: null | number,
    originalname?: string,
    buffer?: Buffer,
    mimetype?: string
  ): Promise<any> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestError(`User with ID ${id} not found.`);
    }

    let profileImg: null | string = null;

    try {
      if (originalname && buffer && mimetype) {
        profileImg = await this.s3ServiceRepository.uploadFile(
          "tune-up",
          originalname,
          buffer,
          mimetype
        );
      }

      await this.userRepository.updateCredentials(
        id,
        username,
        phone,
        profileImg
      );
    } catch (error) {
      throw new BadRequestError("Error during image upload or user update.");
    }

    await this.kafkaService.sendMessage("user-updated", {
      userId: id,
      username,
      phone,
      profileImg,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  }
}