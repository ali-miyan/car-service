import { Chat } from "../../entities";
import { IChatRepository } from "../interfaces";
import { ChatModel, IChat } from "../../infrastructure/db";
import { BadRequestError } from "tune-up-library";

export class ChatRepository implements IChatRepository {
  async getAll(): Promise<IChat[] | null> {
    try {
      return await ChatModel.find();
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }
  async getById(id: string): Promise<IChat[] | null> {
    try {
      return await ChatModel.find({ userId: id });
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }
  async getOne(id: string): Promise<IChat | null> {
    try {
      const chat = await ChatModel.findOne({ _id: id }).select(
        "userId name color src vin"
      );
      return (chat as IChat).toObject();
    } catch (error) {
      throw new BadRequestError("error in db");
    }
  }

  async findByUserAndCompany(userId: string, companyId: string): Promise<Chat | null> {
    try {
      const chat = await ChatModel.findOne({ "user.userId": userId, "company.companyId": companyId }).exec();
      if(!chat) return null
      return chat.toObject() as Chat
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }

  async update(chat: Chat): Promise<void> {
    try {
      await ChatModel.findByIdAndUpdate(chat._id, chat);
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }

  async save(chat: Chat): Promise<void> {
    try {
      const newChat = new ChatModel(chat);
      await newChat.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }
}
