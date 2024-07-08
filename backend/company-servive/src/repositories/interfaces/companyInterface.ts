import { Company } from "../../entities";

export interface ICompanyRepository {
  find(email: string): Promise<Company | null>;
  save(comapny: Company): Promise<Company>;
}
