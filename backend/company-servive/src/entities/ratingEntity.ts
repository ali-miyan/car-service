export interface IRatingData {
  _id?: any;
  serviceId: string;
  userId: string;
  username: string;
  email: string;
  profileImg: string;
  stars: number;
  review: string;
  likes: number;
  dislikes: number;
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
  likes: number;
  dislikes: number;

  constructor({
    _id,
    serviceId,
    userId,
    username,
    email,
    profileImg,
    stars,
    review,
    likes,
    dislikes,
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
