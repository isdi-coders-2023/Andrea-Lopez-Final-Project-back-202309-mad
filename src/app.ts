import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import createDebug from 'debug';

const debug = createDebug('PF:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

// Rutas
// Middleware de Error
