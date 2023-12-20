import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import createDebug from 'debug';

const debug = createDebug('PF:middleware:file:interceptor');
debug('Creando middleware for files');

export class FileInterceptor {
  singleFileStore(fileName = 'file', fileSize = 10_000_000) {
    const options: multer.Options = {
      storage: multer.diskStorage({
        destination: './public/assets/img/films/',
        filename(_req, file, callback) {
          const date = Date.now();
          callback(null, date + '-' + file.originalname);
        },
      }),
      limits: { fileSize },
    };

    const middleware = multer(options).single(fileName);

    return (req: Request, res: Response, next: NextFunction) => {
      const previousBody = req.body;

      middleware(req, res, (err) => {
        if (err) {
          return next(err);
        }

        debug('multer-body:', req.body);

        req.body = { ...previousBody, ...req.body };

        debug('final-body:', req.body);

        next();
      });
    };
  }
}
