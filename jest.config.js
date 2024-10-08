/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: false,
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/src/$1',
  },
  //   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
}
