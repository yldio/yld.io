const base = require('./jest-base.config.js')

module.exports = {
  ...base,
  displayName: 'interaction',
  testMatch: ['<rootDir>/src/**/__tests__/*.js'],
  setupFilesAfterEnv: [
    ...base.setupFilesAfterEnv,
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect'
  ]
}
