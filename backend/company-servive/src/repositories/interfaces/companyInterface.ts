import { Company } from "../../entities";
import { CompanyDocument } from "../../infrastructure/db/models";

export interface ICompanyRepository {
  find(email: string): Promise<CompanyDocument | null>;
  getById(id: string): Promise<CompanyDocument | null>;
  updateStatus(id: string, data: object): Promise<void>;
  getAll(): Promise<CompanyDocument[] | null>;
  getApproved(): Promise<CompanyDocument[] | null>;
  getMonthlyCompanyCounts(): Promise<{ month: string; count: number }[]>;
  getTotalCompanyCounts(): Promise<number>;
  save(comapny: Company): Promise<Company>;
}
