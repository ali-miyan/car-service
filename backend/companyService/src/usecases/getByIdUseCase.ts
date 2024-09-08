import { BadRequestError } from "tune-up-library";
import { ICompanyRepository } from "../repositories";

export class GetByIdUseCase {
  constructor(private companyRepository: ICompanyRepository) {}

  async execute(id: string): Promise<any> {
    try {
      if (!id) {
        throw new BadRequestError("Invalid ID");
      }

      const data = await this.companyRepository.getById(id);
      if (!data) {
        throw new BadRequestError("Can't get approvals");
      }

      return data;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
