import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UsersMongoRepo } from '../repos/user/users.mongo.repo.js';
import { UsersController } from '../controllers/user/users.controller.js';
const debug = createDebug('PF:router:users:router');

debug('Hello from users routes');

export const usersRouter = createRouter();
const repo = new UsersMongoRepo();
const controller = new UsersController(repo);

debug('Hola ..');
usersRouter.post('/register', controller.create.bind(controller));

usersRouter.post('/login', controller.login.bind(controller));
