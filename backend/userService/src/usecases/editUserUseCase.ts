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
    try {
      const user = await this.userRepository.getById(id);

      if (!user) {
        throw new BadRequestError(`User with ID ${id} not found.`);
      }

      let profileImg: null | string = null;

      if (originalname && buffer && mimetype) {
        try {
          profileImg = await this.s3ServiceRepository.uploadFile(
            "tune-up",
            originalname,
            buffer,
            mimetype
          );
        } catch (error) {
          throw new BadRequestError("Error during image upload.");
        }
      }

      await this.userRepository.updateCredentials(
        id,
        username,
        phone,
        profileImg
      );

      await this.kafkaService.sendMessage("user-updated", {
        userId: id,
        username,
        phone,
        profileImg,
        timestamp: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
