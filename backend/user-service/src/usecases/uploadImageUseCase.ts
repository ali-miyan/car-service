import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";
import { S3Service } from "../infrastructure/services";

export class UserImageUseCase {
  constructor(
    private userRepository: IUserRepository,
    private s3ServiceRepository: S3Service
  ) {}

  async execute(
    id: string,
    {
      originalname,
      buffer,
      mimetype,
    }: { originalname: string; buffer: Buffer; mimetype: string }
  ): Promise<any> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestError(`user with ID ${id} not found.`);
    }

    setImmediate(async () => {
      try {
        const profileImg = await this.s3ServiceRepository.uploadFile(
          "tune-up",
          originalname,
          buffer,
          mimetype
        );

        await this.userRepository.updateImage(id, profileImg);
      } catch (error) {
        throw new BadRequestError("error in image");
      }
    });

    return { success: true };
  }
}
