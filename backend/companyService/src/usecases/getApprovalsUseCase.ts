import { BadRequestError } from "tune-up-library";
import { ICompanyRepository } from "../repositories";

export class GetApprovalUseCase {
  constructor(private companyRepository: ICompanyRepository) {}

  async execute(): Promise<any> {
    try {
      const data = await this.companyRepository.getAll();

      if (!data) {
        throw new BadRequestError("Cannot get approvals");
      }

      return data.reverse();
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
