export interface IRatingData {
  _id?: any;
  serviceId: string;
  userId: string;
  username: string;
  email: string;
  profileImg: string;
  stars: number;
  review: string;
  likes: {
    count: number;
    userIds: string[];
  };
  dislikes: {
    count: number;
    userIds: string[];
  };
}
export class Rating implements IRatingData {
  _id?: any;
  serviceId: string;
  userId: string;
  username: string;
  email: string;
  profileImg: string;
  stars: number;
  review: string;
  likes: {
    count: number;
    userIds: string[];
  };
  dislikes: {
    count: number;
    userIds: string[];
  };
  constructor({
    _id,
    serviceId,
    userId,
    username,
    email,
    profileImg,
    stars,
    review,
    likes = { count: 0, userIds: [] },
    dislikes = { count: 0, userIds: [] },
  }: IRatingData) {
    this._id = _id;
    this.serviceId = serviceId;
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.profileImg = profileImg;
    this.stars = stars;
    this.review = review;
    this.likes = likes;
    this.dislikes = dislikes;
  }
}
