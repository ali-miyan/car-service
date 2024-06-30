import { Company } from "../../../../entities/companyEntity";
import { ICompanyRepository } from "../interfaces/companyInterface";
import companyModel from "../../models/companyModel";

export class CompanyRepository implements ICompanyRepository {
  async findByEmail(email: string): Promise<boolean | null> {
    const companyEmail = await companyModel.findOne({ email });
    if (!companyEmail) return null;
    return true;
  }

  async lisenceExpiry(licenseExpiry: string): Promise<boolean | null> {
    const expiryDate = new Date(licenseExpiry);
    const currentDate = new Date();

    return expiryDate < currentDate ? false : true;
  }

  async save(company: Company): Promise<Company> {
    const newCompany = new companyModel(company);
    await newCompany.save();
    return newCompany;
  }
}
