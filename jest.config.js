module.exports = {
  collectCoverage: true,
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 96,
      lines: 92,
      statements: 92
    }
  }
}
