/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  coveragePathIgnorePatterns: [
    'src/main.tsx',
    'src/config.tsx',
    'src/services/storage.ts',
    'src/store/store.ts',
    'src/pages/.ts',
    'src/entities/.ts',
    'src/types/*.ts',
    'src/repos/user/users.mongo.repo.ts',
    'src/repos/user/users.mongo.models.ts',
  ],
};
