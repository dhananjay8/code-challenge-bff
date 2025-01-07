module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@data/(.*)$": "<rootDir>/data/$1",
  },
};
