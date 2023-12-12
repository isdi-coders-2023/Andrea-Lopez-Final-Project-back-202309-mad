import { NextFunction, Request, Response } from 'express';
import { FilmsController } from './films.controller';
import { FilmMongoRepo } from '../../repos/film/films.mongo.repo';
import { HttpError } from '../../types/http.error';
import { Film } from '../../entities/film';

jest.mock('../services/cloudinary.media.files.js');
// Jest.mock('../repos/offers/offers.mongo.repo.js');

describe('Given OfferController class', () => {
  describe('When I call the method', () => {
    let controller: FilmsController;
    const mockRepo = {
      getAll: jest.fn().mockResolvedValue({}),
      getByCategory: jest.fn().mockResolvedValue({}),
      getByUser: jest.fn().mockResolvedValue({}),
      getById: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    } as unknown as FilmMongoRepo;

    const mockRequest = {
      body: {},
      params: {},
      query: { key: 'value' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn().mockReturnValue({} as Film),
      status: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    beforeEach(() => {
      controller = new FilmsController(mockRepo);
    });

    test('getAll', async () => {
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('getById', async () => {
      await controller.getById(mockRequest, mockResponse, mockNext);
      // Expect(mockRepo.getById).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test.skip('create', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.statusMessage).toBe('Created');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test.skip('update', async () => {
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.statusMessage).toBe('Created');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test.skip('delete', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.statusMessage).toBe('Created');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
  });
  describe('When I call the method, return error', () => {
    let controller: FilmsController;
    const mockRepo = {
      getAll: jest.fn().mockRejectedValue({}),
      getByCategory: jest.fn().mockRejectedValue({}),
      getByUser: jest.fn().mockRejectedValue({}),
      getById: jest.fn().mockRejectedValue({}),
      create: jest.fn().mockRejectedValue({}),
      update: jest.fn().mockRejectedValue({}),
      delete: jest.fn().mockRejectedValue({}),
    } as unknown as FilmMongoRepo;

    const mockRequest = {
      body: {},
      params: {},
      query: { key: 'value' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn().mockReturnValue({} as Film),
      status: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    beforeEach(() => {
      controller = new FilmsController(mockRepo);
    });

    test('getAll', async () => {
      mockRequest.body = null;
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(400, 'Bad Request'));
    });

    test('getById', async () => {
      mockRequest.body = null;
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(400, 'Bad Request'));
    });

    test('create without file', async () => {
      mockRequest.file = undefined;
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(400, 'Image is required')
      );
    });
    test('create without body', async () => {
      mockRequest.body = null;
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(406, 'Invalid body'));
    });

    test('update', async () => {
      mockRequest.body = null;
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(406, 'Invalid body'));
    });

    test('delete', async () => {
      mockRequest.body = null;
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(400, 'Bad Request'));
    });
  });
});
