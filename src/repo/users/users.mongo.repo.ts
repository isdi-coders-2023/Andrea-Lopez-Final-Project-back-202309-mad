import createDebug from 'debug';
import { User } from '../../entities/user.js';
import { Repository } from '../repo.js';
import { Auth } from '../../services/auth.js';
import { UserModel } from './users.mongo.models.js';

const debug = createDebug('PF:users:mongo:repo');

export class UserMongoRepo implements Repository<User> {
  constructor() {
    debug('Instanciando Repo Mongo Users');
  }
}

async create(newItem: Omit<User,'id'>): Promise<User> {
  newItem.passwd = await Auth.hash(newItem.passwd)
  const result: User = await UserModel.create(newItem)
}
