module.exports = {
  ...require('./jest-base.config.js'),
  displayName: 'interaction',
  testMatch: ['<rootDir>/src/**/__tests__/*.js'],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect'
  ]
}
