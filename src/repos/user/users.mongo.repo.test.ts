import { User, UserLogin } from '../../entities/user';
import { Auth } from '../../services/auth';
import { HttpError } from '../../types/http.error';

import { UserModel } from './users.mongo.models.js';
import { UsersMongoRepo } from './users.mongo.repo';

jest.mock('./users.mongo.models.js');
describe('Given UsersMongoRepo class', () => {
  let repo: UsersMongoRepo;
  describe('When we instaited it without errors', () => {
    const exec = jest.fn().mockResolvedValue('login');

    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        exec,
      });
      UserModel.create = jest.fn().mockReturnValue('Created');
      repo = new UsersMongoRepo();
      UserModel.findOne = mockQueryMethod;

      Auth.hash = jest.fn().mockResolvedValue('testHash');
      Auth.compare = jest.fn().mockResolvedValue(true);
    });
    test('Then it should execute create', async () => {
      const result = await repo.create({} as Omit<User, 'id'>);
      // Expect(Auth.hash).toHaveBeenCalled();
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toBe('login');
    });

    test('Then it should execute login', async () => {
      const result = await repo.login({} as UserLogin);
      expect(UserModel.findOne).toHaveBeenCalled();
      expect(Auth.compare).toHaveBeenCalled();
      expect(result).toBe('login');
    });

    test('Then it should execute getAll', async () => {
      const result = await repo.getAll();
      expect(result).toBe('login');
    });
  });
  describe('When we instantiate iw with errors', () => {
    const mockError = new Error('Invalid Credentials');
    const exec = jest.fn().mockRejectedValue(mockError);

    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        exec,
      });
      UserModel.findOne = mockQueryMethod;
    });
    test('Then it should execute with fail login', async () => {
      const loginUser = {} as unknown as UserLogin;
      expect(repo.login(loginUser)).rejects.toThrow(
        new HttpError(401, 'Unauthorized', 'Login not possible')
      );
    });
  });
});
