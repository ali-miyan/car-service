import { Company } from "../../entities";
import { CompanyDocument } from "../../infrastructure/db/models/companyModel";

export interface ICompanyRepository {
  find(email: string): Promise<CompanyDocument | null>;
  save(comapny: Company): Promise<Company>;
}
