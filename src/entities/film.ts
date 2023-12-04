import { ImgData, User } from './user';

export type Film = {
  id: string;
  title: string;
  about: string;
  decade: string;
  country: string;
  imageURL: ImgData;
  user: User;
};
