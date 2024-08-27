import { Car } from "../../entities";
import { ICarData } from "../../infrastructure/db";

export interface ICarRepository {
  getAll(): Promise<ICarData[] | null>;
  getById(id: string): Promise<ICarData[] | null>;
  getOne(id: string): Promise<ICarData | null>;
  updateStatus(id: string,data:object): Promise<void>;
  updateImage(id: string, profileImg: string): Promise<void>;
  updateCredentials(id: string, username: string, phone: null | number): Promise<void>;
  deleteById(id:string):Promise<void>;
  getUsersDetails(carId:string):Promise<any>;
  save(car: Car): Promise<void>;
}
