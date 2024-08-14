import { Company } from "../../entities/companyEntity";
import { ICompanyRepository } from "../interfaces";
import { companyModal,CompanyDocument } from "../../infrastructure/db";

export class CompanyRepository implements ICompanyRepository {
  async find(email: string): Promise<CompanyDocument | null> {
    try {
      const newCompany = await companyModal.findOne({ email: email });
      if (!newCompany) return null;
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getAll(): Promise<CompanyDocument[] | null> {
    try {
      const newCompany = await companyModal.find();
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getApproved(): Promise<CompanyDocument[] | null> {
    try {
      const newCompany = await companyModal.find({isApproved:"accepted" , isBlocked:false});
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getById(id:string): Promise<CompanyDocument | null> {
    try {
      const newCompany =await companyModal.findOne({_id:id});
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async updateStatus(id: string, data: object): Promise<void> {
    try {
      await companyModal.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async save(company: Company): Promise<Company> {
    try {
      const newCompany = new companyModal(company);
      await newCompany.save();
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
}
