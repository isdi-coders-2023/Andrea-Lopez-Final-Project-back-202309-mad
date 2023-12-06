/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { Auth } from '../services/auth.js';
import { UsersMongoRepo } from '../repos/users.mongo.repo.js';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('PF:users:controller');

export class UsersController {
  constructor(protected repo: UsersMongoRepo) {
    debug('Instantiated');
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = req.body.userid;

      await this.repo.login(req.body);
      if (!result) {
        throw new HttpError(401, 'Invalid credentials');
      }

      const data = {
        user: result,
        token: Auth.signJWT({
          id: result.id,
          email: result.email,
        }),
      };
      res.status(202);
      res.statusMessage = 'Accepted';
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
