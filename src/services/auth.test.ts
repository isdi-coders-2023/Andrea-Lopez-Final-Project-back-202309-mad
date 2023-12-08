import { compare, hash } from 'bcrypt';
import { Auth } from './auth';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/token.payload';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Given Auth abstract class', () => {
  describe('When we use its methods', () => {
    test('Then hash should...', () => {
      // Arrange
      (hash as jest.Mock).mockReturnValue('test');
      const mockValue = '';
      // Act
      const result = Auth.hash(mockValue);
      // Assert
      expect(hash).toHaveBeenCalled();
      expect(result).toBe('test');
    });
    test('Then compare should...', () => {
      (compare as jest.Mock).mockReturnValue(true);
      const mockValue = '';
      const result = Auth.comparison(mockValue, mockValue);
      expect(compare).toHaveBeenCalled();
      expect(result).toBe(true);
    });
    test('Then signJW has should...', () => {
      jwt.sign = jest.fn().mockReturnValue('test');
      const result = Auth.signJWT('' as unknown as TokenPayload);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe('test');
    });
    test('Then verifyAndGetPayload should...', () => {
      jwt.verify = jest.fn().mockReturnValue({});
      const result = Auth.verifyAndGetPayload('');
      expect(jwt.verify).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });
  });
  describe('When we use its methods with errors', () => {
    // Cómo testear un error síncrono
    test('Then verifyAndGetPayload should...', () => {
      jwt.verify = jest.fn().mockReturnValue('');
      expect(() => Auth.verifyAndGetPayload('')).toThrow();
      expect(jwt.verify).toHaveBeenCalled();
    });
  });
});
