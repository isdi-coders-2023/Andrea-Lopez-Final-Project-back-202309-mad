import { Schema, model } from 'mongoose';
import { Film } from '../../entities/film';

const filmsSchema = new Schema<Film>({
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  decade: {
    type: String,
  },
  country: {
    type: String,
  },
  image: {
    type: String,
  },
  user: {
    type: String,
  },
});
filmsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model<Film>('User', filmsSchema, 'users');
