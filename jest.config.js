// jest.config.js

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // A preset that is used as a base for Jest's configuration
  // 'ts-jest' is a great preset for projects using TypeScript.
  preset: 'ts-jest',

  // The test environment that will be used for testing.
  // 'node' is suitable for backend projects. Use 'jsdom' for frontend projects (React, Vue, etc.).
  testEnvironment: 'node',

  // Automatically clear mock calls, instances, contexts and results before every test.
  // This is a good practice to ensure test isolation.
  clearMocks: true,

  // The directory where Jest should output its coverage files.
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage.
  // 'v8' is modern and efficient.
  coverageProvider: 'v8',

  // A list of paths to directories that Jest should use to search for files in.
  // '<rootDir>' is a special token that refers to the project's root directory.
  roots: ['<rootDir>/src'],

  // The glob patterns Jest uses to detect test files.
  // This pattern looks for files with .test.ts or .spec.ts extensions
  // inside __tests__ folders or anywhere in the source.
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  // A map from regular expressions to module names or to arrays of module names
  // that allow to stub out resources with a single module.
  // This is essential for using path aliases (e.g., '@/' or 'src/').
  moduleNameMapper: {
    // Example: aliasing 'src' to '@'
    // Ensure this matches the 'paths' in your tsconfig.json
    '^@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  // An array of regexp pattern strings that are matched against all test paths before executing the test.
  // If the test path matches any of the patterns, it will be skipped.
  // Good for ignoring build folders, node_modules, etc.
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // An array of file extensions your modules use.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // A list of paths to modules that run some code to configure or set up the testing framework
  // before each test file in the suite is executed.
  // setupFilesAfterEnv: ['./jest.setup.js'],
};