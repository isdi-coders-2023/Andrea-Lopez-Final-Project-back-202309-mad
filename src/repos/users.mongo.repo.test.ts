import { User, UserLogin } from '../entities/user';

import { UserModel } from './user/users.mongo.models.js';
import { UsersMongoRepo } from './user/users.mongo.repo';

jest.mock('./users.mongo.models');

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
      UserModel.find = mockQueryMethod;
    });
    test('Then it should execute create', async () => {
      const result = await repo.create({} as Omit<User, 'id'>);
      // Expect(Auth.hash).toHaveBeenCalled();
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toBe('login');
    });

    test('Then it should execute login', async () => {
      const result = await repo.login({ email: '' } as UserLogin);
      expect(UserModel.findOne).toHaveBeenCalled();
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
      repo = new UsersMongoRepo();
    });
    test('Then it should execute with an error in the credential on Login', async () => {
      const result = await repo.login({} as UserLogin);
      expect(UserModel.findOne).toHaveBeenCalled();
      expect(result).toHaveBeenCalledWith(mockError);
    });
  });
});
