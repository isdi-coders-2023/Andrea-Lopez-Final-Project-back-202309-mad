import { Film } from './film';

export type UserLogin = {
  email: string;
  password: string;
};

export type User = UserLogin & {
  id: string;
  name: string;
  surname: string;
  age: number;
  films: Film[];
};

export type ImgData = {
  publicId: string;
  size: number;
  width: number;
  height: string;
  format: string;
  url: string;
};
