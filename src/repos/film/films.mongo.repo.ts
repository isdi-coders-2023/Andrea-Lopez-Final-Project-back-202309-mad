import createDebug from 'debug';
import { Film } from '../../entities/film';
import { FilmModel } from './films.mongo.models.js';
import { HttpError } from '../../types/http.error.js';

const debug = createDebug('PF:films:mongo:repo');

export class FilmMongoRepo {
  constructor() {
    debug('Instantiated repo...');
  }

  async getAll(): Promise<Film[]> {
    const result = await FilmModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<Film> {
    const result = await FilmModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Error');
    return result;
  }

  async update(id: string, updatedItem: Partial<Film>): Promise<Film> {
    const result = await FilmModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Error');
    return result;
  }

  async create(film: Omit<Film, 'id'>): Promise<Film> {
    const result = await FilmModel.create(film);
    if (!result) throw new HttpError(404, 'Not Found', 'Error');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await FilmModel.findByIdAndDelete(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Error');
  }

  async getByIdMyFilms(myFilms: []): Promise<Film> {
    const result = await FilmModel.find({ _id: { $in: myFilms } })
      .populate('user')
      .exec();

    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');

    return result as unknown as Film;
  }
}
