import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { FilmMongoRepo } from '../../repos/film/films.mongo.repo';
import { HttpError } from '../../types/http.error';

const debug = createDebug('PF:controller:film');

export class OffersController {
  // LoudinaryService: CloudinaryMediaFiles;

  constructor(private repo: FilmMongoRepo) {
    this.repo = repo;
    // This.cloudinaryService = new CloudinaryMediaFiles();
    debug('Intanciando films controller...');
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.getAll();
      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.getById(req.params.id);
      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // If (!req.file) throw new HttpError(400, 'Image is required');
      // // Const imgData = await this.cloudinaryService.uploadImage(req.file.path);

      // req.body.image = {
      //   publicId: req.file?.filename,
      //   format: req.file?.mimetype,
      //   url: req.file?.path,
      //   size: req.file?.size,
      //   cloudinaryURL: imgData.url,
      // };

      if (!req.body) throw new HttpError(406, 'Invalid body');
      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) throw new HttpError(406, 'Invalid body');
      const result = await this.repo.update(req.params.id, req.body);
      res.status(200);
      res.statusMessage = 'Updated';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.delete(req.params.id);
      debug('Controller result create:', result);
      res.status(200);
      res.statusMessage = 'Deleted';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}