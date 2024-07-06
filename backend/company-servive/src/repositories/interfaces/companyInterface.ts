import { Company } from "../../entities";

export interface ICompanyRepository {
  save(comapny: Company): Promise<Company>;
}
