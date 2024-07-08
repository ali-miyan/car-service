import { Company } from "../../entities/companyEntity";
import { ICompanyRepository } from "../interfaces";
import companyModel from "../../infrastructure/db/models/companyModel";

export class CompanyRepository implements ICompanyRepository {
  async find(email:string): Promise<Company | null> {
    const newCompany = companyModel.findOne({email:email});
    if(!newCompany) return null
    return newCompany;
  }
  async save(company: Company): Promise<Company> {
    const newCompany = new companyModel(company);
    await newCompany.save();
    return newCompany;
  }
}
