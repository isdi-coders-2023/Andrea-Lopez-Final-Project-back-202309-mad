import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import { UsersMongoRepo } from '../repos/users.mongo.repo.js';

const debugServer = createDebug('PF:controllers:users');

export class UsersController {
  constructor(private repo: UsersMongoRepo) {
    this.repo = repo;
    debugServer('Instanciando');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      debugServer('Controller body login:', req.body);
      if (!req.body) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.login(req.body);
      const data = {
        user: result,
        token: Auth.signJWT({ id: result.id, email: result.email }),
      };

      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      debugServer('Controller body create:', req.body);
      if (!req.body) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.create(req.body);
      debugServer('Controller result create:', result);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
