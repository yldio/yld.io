module.exports = {
  ...require('./jest.config.js'),
  testEnvironment: 'node',
  testMatch: ['**/__e2e__/**/*.[jt]s?(x)'],
};
