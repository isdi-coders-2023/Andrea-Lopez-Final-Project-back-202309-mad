import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { FilmMongoRepo } from '../repos/film/films.mongo.repo.js';
import { FilmsController } from '../controllers/film/films.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('PF:router:films:router');

export const filmsRouter = createRouter();
debug('Hello from films router');

const repo = new FilmMongoRepo();
const controller = new FilmsController(repo);
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();

// CRUD

// Get All Films
filmsRouter.get('/', controller.getAll.bind(controller));

// Get Any Fil
filmsRouter.get('/:id', controller.getById.bind(controller));

// Create User Film

filmsRouter.post(
  '/',
  fileInterceptor.singleFileStore('image').bind(fileInterceptor),
  interceptor.authorization.bind(interceptor),
  controller.create.bind(controller)
);

// EDIT / Update Film

filmsRouter.post(
  '/:id',
  fileInterceptor.singleFileStore('image').bind(fileInterceptor),
  interceptor.authorization.bind(interceptor),
  controller.update.bind(controller)
);

// Eliminar pelicula

filmsRouter.post(
  ':/id',
  fileInterceptor.singleFileStore('image').bind(fileInterceptor),
  interceptor.authorization.bind(interceptor)
);
