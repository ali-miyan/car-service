import { Chat } from "../../entities";
import { IChat } from "../../infrastructure/db";

export interface IChatRepository {
  getAll(): Promise<IChat[] | null>;
  getById(id: string): Promise<IChat[] | null>;
  getOne(id: string): Promise<IChat | null>;
  save(car: Chat): Promise<void>;
  update(chat: Chat): Promise<void>;
  findByUserAndCompany(userId: string, companyId: string): Promise<Chat | null>;
}
