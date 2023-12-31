import { Film } from './film';

export type UserLogin = {
  email: string;
  passwd: string;
};

export type User = UserLogin & {
  id: string;
  name: string;
  surname: string;
  age: string;
  films: Film[];
};
