module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true, // Enable code coverage
    collectCoverageFrom: [
      "src/**/*.{ts,tsx}", // Include all TypeScript files in src folder
      "!src/**/*.d.ts",    // Exclude TypeScript declaration files
    ],
    coverageDirectory: "coverage", // Optional: specify where to output coverage reports
  };
  