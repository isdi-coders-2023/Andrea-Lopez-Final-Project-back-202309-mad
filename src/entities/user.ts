export type UserLogin = {
  email: string;
  passwd: string;
};

export type User = UserLogin & {
  id: string;
  name: string;
  surname: string;
  age: number;
};

export type ImgData = {
  publicId: string;
  size: number;
  width: number;
  height: string;
  format: string;
  url: string;
};
