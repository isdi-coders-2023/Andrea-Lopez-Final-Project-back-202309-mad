import { Request, Response } from 'express';
import { Auth } from '../services/auth';
import { AuthInterceptor } from './auth.interceptor';

describe('Given the class AuthInterceptor', () => {
  const authInterceptor = new AuthInterceptor();
  const mockeResponse = {} as unknown as Response;
  const mockNext = jest.fn();
  describe('When it is instantiated and...', () => {
    test('Then, when the method authorization() is called', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue('Bearer Token'),
        body: {},
      } as unknown as Request;
      Auth.verifyAndGetPayload = jest.fn().mockReturnValueOnce({ id: '1' });
      authInterceptor.authorization(mockRequest, mockeResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
  describe('When there are errors', () => {
    test('When thre is no authorization', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue(null),
        body: {},
      } as unknown as Request;
      authInterceptor.authorization(mockRequest, mockeResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
