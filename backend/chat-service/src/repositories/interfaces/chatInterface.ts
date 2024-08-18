import { Chat } from "../../entities";
import { IChat } from "../../infrastructure/db";

export interface IChatRepository {
  getOneChat(chatId:string): Promise<Chat | null>;
  getById(companyId: string): Promise<IChat[] | null>;
  save(chat: Chat): Promise<void>;
  update(chat: Chat): Promise<void>;
  findByUserAndCompany(userId: string, companyId: string): Promise<Chat | null>;
}
