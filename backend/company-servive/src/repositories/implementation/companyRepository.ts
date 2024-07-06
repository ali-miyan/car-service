import { Company } from "../../entities/companyEntity";
import { ICompanyRepository } from "../interfaces";
import companyModel from "../../infrastructure/db/models/companyModel";

export class CompanyRepository implements ICompanyRepository {
  async save(company: Company): Promise<Company> {
    const newCompany = new companyModel(company);
    await newCompany.save();
    return newCompany;
  }
}
