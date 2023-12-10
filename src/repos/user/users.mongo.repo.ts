import createDebug from 'debug';
import { UserLogin, User } from '../../entities/user';
import { HttpError } from '../../types/http.error.js';
import { Auth } from '../../services/auth.js';
import { UserModel } from './users.mongo.models.js';
const debug = createDebug('PF:users:mongo:repo');

export class UsersMongoRepo {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async create(newUser: Omit<User, 'id'>): Promise<User> {
    newUser.passwd = await Auth.hash(newUser.passwd);
    const result: User = await UserModel.create(newUser);
    return result;
  }

  async login(loginUser: UserLogin): Promise<User> {
    const result = await UserModel.findOne({ email: loginUser.email }).exec();
    debug(result, 'resultado del login');
    if (!result || !(await Auth.compare(loginUser.passwd, result.passwd)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }
}
