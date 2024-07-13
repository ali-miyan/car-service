import { Company } from "../../entities";
import { CompanyDocument } from "../../infrastructure/db/models/companyModel";

export interface ICompanyRepository {
  find(email: string): Promise<CompanyDocument | null>;
  getById(id: string): Promise<CompanyDocument | null>;
  updateStatus(id: string,data:object): Promise<void>;
  getAll(): Promise<CompanyDocument[] | null>;
  save(comapny: Company): Promise<Company>;
}
