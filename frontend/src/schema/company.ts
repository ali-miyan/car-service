import { AddressData } from './address';

export interface Post {
  _id: string;
  ownerName: string;
  companyName: string;
  year: number;
  logo: string;
  contact1: number;
  contact2: number;
  email: string;
  licenseNumber: string;
  licenseExpiry: string;
  address: AddressData;
  password: string;
  licenseImg: string;
  approvedImg: string;
  isBlocked: boolean;
  isApproved: "pending" | "accepted" | "declined";
}
