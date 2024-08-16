export interface IUserDetails {
  userId: string;
  username?: string;
  userImg?: string;
}

export interface ICompanyDetails {
  companyId: string;
  companyName?: string;
  companyImg?: string;
}

export interface IMessageData {
  sender: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
}

export interface IChatData {
  _id?: string;
  user: IUserDetails;
  company: ICompanyDetails;
  messages: IMessageData[];
}

export class Chat {
  _id?: string;
  user: IUserDetails;
  company: ICompanyDetails;
  messages: IMessageData[];

  constructor({ _id, user, company, messages }: IChatData) {
    this._id = _id;
    this.user = user;
    this.company = company;
    this.messages = messages;
  }
}
