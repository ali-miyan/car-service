import { BadRequestError } from "tune-up-library";
import { ICompanyRepository } from "../repositories";

export class UpdateStatusUseCase {
  constructor(private companyRepository: ICompanyRepository) {}

  async execute(id: string, data: object): Promise<any> {
    try {
      const service = await this.companyRepository.getById(id);

      if (!service) {
        throw new BadRequestError(`Service with ID ${id} not found.`);
      }

      await this.companyRepository.updateStatus(id, data);

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
