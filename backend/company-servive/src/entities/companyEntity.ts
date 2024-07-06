export interface ICompanyData {
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
  address:object
}

export class Company {
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
  address:object;

  constructor({
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
    address
  }: ICompanyData) {
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
    this.address = address;
  }
}
