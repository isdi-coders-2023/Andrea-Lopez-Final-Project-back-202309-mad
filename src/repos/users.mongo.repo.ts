import createDebug from 'debug';
import { Repository } from './repo';
import { UserLogin, User } from '../entities/user.js';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import { UserModel } from './users.mongo.models.js';
const debug = createDebug('PF:users:mongo:repo');

export class UsersMongoRepo implements Repository<User> {
  constructor() {
    debug('Instantiated');
  }

  async create(newItem: Omit<User, 'id'>): Promise<User> {
    newItem.passwd = await Auth.hash(newItem.passwd);
    const result: User = await UserModel.create(newItem);
    return result;
  }

  async login(UserLogin: UserLogin): Promise<User> {
    const result = await UserModel.findOne({ email: UserLogin.email }).exec();
    if (!result || !(await Auth.comparison(UserLogin.passwd, result.passwd)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }
}
