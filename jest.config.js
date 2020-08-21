const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/domains/**/*.ts',
    '!src/domains/**/routes.ts',
    'src/libs/**/*.ts',
    'src/models/**/*.ts',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/database/',
    '/config/',
    '/libs/',
    '/models\/error/',
    '.*\.controller\.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    "src/domains/**/use-cases/**/*.usecase.ts": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  },
}
