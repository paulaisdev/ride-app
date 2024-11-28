import type { Config } from "jest";

const jestConfig: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // Inclui axios para transformação
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default jestConfig;
