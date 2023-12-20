import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { FilmMongoRepo } from '../repos/film/films.mongo.repo.js';

import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';
import { FilmsController } from '../controllers/films.controller.js';

const debug = createDebug('PF:router:films:router');

export const filmsRouter = createRouter();
debug('Hello from films router');

const repo = new FilmMongoRepo();
const controller = new FilmsController(repo);
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();

filmsRouter.get('/', controller.getAll.bind(controller));

filmsRouter.get('/:id', controller.getById.bind(controller));

filmsRouter.post(
  '/',
  fileInterceptor.singleFileStore('image').bind(fileInterceptor),
  interceptor.authorization.bind(interceptor),
  controller.create.bind(controller)
);

filmsRouter.post(
  '/:id',
  fileInterceptor.singleFileStore('image').bind(fileInterceptor),
  interceptor.authorization.bind(interceptor),
  controller.update.bind(controller)
);

filmsRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  controller.delete.bind(controller)
);
