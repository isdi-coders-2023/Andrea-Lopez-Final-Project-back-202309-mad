import { HttpError } from './http.error';

describe('Given HttpError class', () => {
  describe('When we instantiate it', () => {
    const mockStatus = 8;
    const mockMessage = 'message';
    const error = new HttpError(mockStatus, mockMessage);
    test('Then it should have the properties status and statusMessage with the parameters values', () => {
      expect(error).toHaveProperty('status', mockStatus);
      expect(error).toHaveProperty('message', mockMessage);
    });
  });
});
