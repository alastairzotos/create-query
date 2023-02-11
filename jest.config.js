module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/?(*.)+(spec|test).+(ts|tsx)",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  coveragePathIgnorePatterns: [
    "node_modules"
  ],
  moduleDirectories: ['node_modules', '<rootDir>'],
  // moduleNameMapper: {
  //   '^react$': require.resolve('react'),
  // }
};
