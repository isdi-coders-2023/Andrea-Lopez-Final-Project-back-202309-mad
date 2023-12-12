import { User } from './user';

export type Film = {
  id: string;
  title: string;
  director: string;
  about: string;
  decade: number;
  country: string;
  image: ImageData;
  user: User;
};
