import createDebug from 'debug';
import { User } from '../../entities/user.js';
import { Repository } from '../repo.js';

const debug = createDebug('PF:users:mongo:repo');

export class UserMongoRepo implements Repository<User> {
  constructor() {
    debug('Instanciando Repo Mongo Users');
  }
}

create(_newItem);
