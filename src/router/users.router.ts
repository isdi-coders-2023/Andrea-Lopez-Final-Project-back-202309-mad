import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UsersMongoRepo } from '../repos/users.mongo.repo.js';
import { UsersController } from '../controllers/users.controller.js';
// Import { AuthInterceptor } from '../middleware/auth.interceptor.js';
const debug = createDebug('PF:router:users:router');

debug('Hello from routes');

export const usersRouter = createRouter();
const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
// Const interceptor = new AuthInterceptor();

debug('Hola ..');
usersRouter.post('/register', controller.create.bind(controller));

usersRouter.post('/login', controller.login.bind(controller));
