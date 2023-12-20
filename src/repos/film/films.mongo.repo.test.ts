import { FilmMongoRepo } from './films.mongo.repo';
import { FilmModel } from './films.mongo.models';

jest.mock('./films.mongo.models');

describe('FilmMongoRepo', () => {
  let filmRepo: FilmMongoRepo;

  beforeEach(() => {
    filmRepo = new FilmMongoRepo();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all films', async () => {
      const mockFilms = [{ title: 'Film 1' }, { title: 'Film 2' }];
      FilmModel.find = jest.fn().mockResolvedValue(mockFilms);

      const result = await filmRepo.getAll();

      expect(result).toEqual(mockFilms);
      expect(FilmModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return a film by ID', async () => {
      const mockFilm = { _id: '123', title: 'Film 1' };
      FilmModel.findById = jest.fn().mockResolvedValue(mockFilm);

      const result = await filmRepo.getById('123');

      expect(result).toEqual(mockFilm);
      expect(FilmModel.findById).toHaveBeenCalledWith('123');
    });

    it('should throw a 404 error if film is not found', async () => {
      FilmModel.findById = jest.fn().mockResolvedValue(null);
      await expect(filmRepo.getById('nonexistentId')).rejects.toThrow(
        'Not Found'
      );
    });
  });
});
