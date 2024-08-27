import { Company } from "../../entities/companyEntity";
import { ICompanyRepository } from "../interfaces";
import { companyModal, CompanyDocument } from "../../infrastructure/db";

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
  async getTotalCompanyCounts(): Promise<number> {
    try {
      const count = await companyModal.countDocuments({});
      return count;
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async getMonthlyCompanyCounts(): Promise<{ month: string; count: number }[]> {
    try {
      const result = await companyModal
        .aggregate([
          {
            $project: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
          },
          {
            $group: {
              _id: { month: "$month", year: "$year" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: { "_id.year": 1, "_id.month": 1 },
          },
          {
            $project: {
              _id: 0,
              month: "$_id.month",
              year: "$_id.year",
              count: 1,
            },
          },
        ])
        .exec();

      return result.map((item) => ({
        month: `${item.year}-${item.month.toString().padStart(2, "0")}`,
        count: item.count,
      }));
    } catch (error) {
      throw new Error("Error retrieving company counts by month");
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
      const newCompany = await companyModal.find({
        isApproved: "accepted",
        isBlocked: false,
      });
      return newCompany;
    } catch (error) {
      throw new Error("error in db");
    }
  }
  async getById(id: string): Promise<CompanyDocument | null> {
    try {
      const newCompany = await companyModal.findOne({ _id: id });
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
