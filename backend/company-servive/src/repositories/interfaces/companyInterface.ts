import { Company } from "../../entities";

export interface ICompanyRepository {
  findByEmail(email: string): Promise<boolean | null>;
  save(comapny: Company): Promise<Company>;
}
