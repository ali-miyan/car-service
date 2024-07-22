import { Car } from "../../entities";
import { ICarData } from "../../infrastructure/db";

export interface ICarRepository {
  getAll(): Promise<ICarData[] | null>;
  getById(id: string): Promise<ICarData | null>;
  updateStatus(id: string,data:object): Promise<void>;
  findByPhone(phone: number): Promise<boolean | null>;
  updateImage(id: string, profileImg: string): Promise<void>;
  updateCredentials(id: string, username: string, phone: null | number): Promise<void>;
  save(user: Car): Promise<Car>;
}
