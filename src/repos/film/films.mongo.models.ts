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
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
    cloudinaryURL: String,
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

export const FilmModel = model<Film>('Film', filmsSchema, 'films');
