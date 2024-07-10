import { Company } from "../../entities/companyEntity";
import { ICompanyRepository } from "../interfaces";
import companyModel from "../../infrastructure/db/models/companyModel";

export class CompanyRepository implements ICompanyRepository {
  async find(email: string): Promise<Company | null> {
    try {
      const newCompany = companyModel.findOne({ email: email });
      if (!newCompany) return null;
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async save(company: Company): Promise<Company> {
    try {
      const newCompany = new companyModel(company);
      await newCompany.save();
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
}
