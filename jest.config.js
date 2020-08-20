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
    '.*\.controller\.ts',
  ]
}
