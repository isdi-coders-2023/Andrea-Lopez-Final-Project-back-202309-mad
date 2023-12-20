/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  coveragePathIgnorePatterns: [
    'src/index.ts',
    'src/config.tsx',
    'src/services/storage.ts',
    'src/store/store.ts',
    'src/pages/.ts',
    'src/entities/.ts',
    'src/types/*.ts',
    'src/repos/user/users.mongo.repo.ts',
    'src/repos/user/users.mongo.models.ts',
    'src/repos/film/films.mongo.repo.ts',
    'src/repos/film/films.mongo.models.ts',
    'src/controllers/film/films.controller.ts',
    'src/repos/film/films.mongo.repo.test.ts',
    'src/app.ts',
    'src/middleware/file.interceptor.ts',
    'src/router/users.router.ts',
    'src/router/films.router.ts',
    ' src/middleware/file.interceptor.ts',
  ],
};
