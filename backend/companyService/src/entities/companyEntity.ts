export interface ICompanyData {
  _id?: any;
  ownerName: string;
  companyName: string;
  year: number;
  logo: string;
  contact1: number;
  contact2: number;
  email: string;
  licenseNumber: string;
  licenseExpiry: string;
  password: string;
  licenseImg: string;
  approvedImg: string;
  description: string;
  address: object;
  isApproved: "pending" | "accepted" | "declined";
}

export class Company {
  _id?: any;
  ownerName: string;
  companyName: string;
  year: number;
  logo: string;
  contact1: number;
  contact2: number;
  email: string;
  licenseNumber: string;
  licenseExpiry: string;
  password: string;
  licenseImg: string;
  approvedImg: string;
  description: string;
  address: object;
  isApproved: "pending" | "accepted" | "declined";

  constructor({
    _id,
    ownerName,
    companyName,
    year,
    logo,
    contact1,
    contact2,
    email,
    licenseNumber,
    licenseExpiry,
    password,
    licenseImg,
    approvedImg,
    description,
    address,
    isApproved = "pending",
  }: ICompanyData) {
    this._id = _id;
    this.ownerName = ownerName;
    this.companyName = companyName;
    this.year = year;
    this.logo = logo;
    this.contact1 = contact1;
    this.contact2 = contact2;
    this.email = email;
    this.licenseNumber = licenseNumber;
    this.licenseExpiry = licenseExpiry;
    this.password = password;
    this.licenseImg = licenseImg;
    this.approvedImg = approvedImg;
    this.description = description;
    this.address = address;
    this.isApproved = isApproved;
  }
}
