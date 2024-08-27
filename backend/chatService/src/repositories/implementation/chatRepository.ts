import { Chat, IUserDetails } from "../../entities";
import { IChatRepository } from "../interfaces";
import { ChatModel, IChat } from "../../infrastructure/db";
import { BadRequestError } from "tune-up-library";

export class ChatRepository implements IChatRepository {
  async getOneChat(chatId: string): Promise<Chat | null> {
    try {
      const chat = await ChatModel.findOne({ _id: chatId });
      if (!chat) {
        return null;
      }
      return chat.toObject();
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }
  async getById(companyId: string): Promise<IChat[] | null> {
    try {
      return await ChatModel.find({ "company.companyId": companyId });
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }
  async editUser(
    userId: any,
    username: string,
    profileImg: string | null
  ): Promise<void> {
    try {
      const update: Partial<any> = {};

      if (username !== null) update['user.username'] = username;
      if (profileImg !== null) update['user.userImg'] = profileImg;
      
      const res = await ChatModel.updateMany({ 'user.userId':userId }, { $set: update });      
      console.log('updated hex  x re also',res,update);
      
    } catch (error) {
      console.log(error);
      throw new BadRequestError("error in db");
    }
  }

  async findByUserAndCompany(
    userId: string,
    companyId: string
  ): Promise<Chat | null> {
    try {
      const chat = await ChatModel.findOne({
        "user.userId": userId,
        "company.companyId": companyId,
      }).exec();
      if (!chat) return null;
      return chat.toObject() as Chat;
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
