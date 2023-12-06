import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UsersMongoRepo } from '../repo/users/users.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { UsersController } from '../controllers/users.controller.js';

const debug = createDebug('PF:router:users:router');

export const usersRouter = createRouter();
debug('Hello from routes');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
const interceptor = new AuthInterceptor();

usersRouter.post('/register', controller.create.bind(controller));
usersRouter.patch(
  '/login',
  interceptor.authorization.bind(controller),
  controller.login.bind(controller)
);
