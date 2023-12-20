import { User } from '../entities/user';
import jwt from 'jsonwebtoken';

export type TokenPayload = {
  id: User['id'];
  email: User['email'];
} & jwt.JwtPayload;
