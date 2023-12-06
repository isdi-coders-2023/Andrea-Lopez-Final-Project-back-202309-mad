import createDebug from 'debug';
import { Repository } from '../repo';
import { UserLogin, User } from '../../entities/user.js';
import { UserModel } from './users.mongo.models.js';
import { HttpError } from '../../types/http.error.js';
import { Auth } from '../../services/auth.js';

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

  async login(userLogin: UserLogin): Promise<User> {
    debug('login email', userLogin.email);
    const result = await UserModel.findOne({ email: userLogin.email }).exec();
    if (!result || !(await Auth.compare(userLogin.passwd, result.passwd)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: 'id' | 'name' | keyof UserLogin | 'surname' | 'age';
    value: unknown;
  }): Promise<User[]> {
    const result = await UserModel.find({ [key]: value }).exec();
    return result;
  }

  async update(id: string, updatedItem: Partial<User>): Promise<User> {
    const result = await UserModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
