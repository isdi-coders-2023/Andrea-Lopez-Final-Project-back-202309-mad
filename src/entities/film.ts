import { User } from './user';

export type Film = {
  id: string;
  title: string;
  about: string;
  decade: string;
  country: string;
  image: ImageData;
  user: User;
};
