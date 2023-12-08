/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  coveragePathIgnorePatterns: [
    'src/repos/users.mongo.models.ts',
    'src/app.ts',
    'src/index.ts',
    'src/repos/repo.ts',
    'src/router/users.router.ts',
  ],
};
