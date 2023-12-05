import createDebug from 'debug';
import { NextFunction, Response, Request } from 'express';
import { HttpError } from '../types/http.error.js';
import mongoose, { Error } from 'mongoose';

const debug = createDebug('PF:error:middleware');

debug('Starting Error Middleware');

export const ErrorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug('Errors Middleware');

  if (error instanceof HttpError) {
    res.status(error.status);
    res.statusMessage = error.statusMessage;
  } else if (error instanceof RangeError) {
    res.status(416);
    res.statusMessage = 'Request Range Not Satisfiable';
  } else if (error instanceof Error.ValidationError) {
    res.status(400);
    res.statusMessage = 'Bad request';
  } else if (error instanceof mongoose.mongo.MongoServerError) {
    res.status(406);
    res.statusMessage = 'Not accepted';
  } else {
    res.status(500);
    res.statusMessage = 'Internal Server Error';
  }

  res.json({});
  debug((error as Error).name);
  debug((error as Error).message);
};
