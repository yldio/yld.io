const { setupFiles, ...base } = require('./jest.config.js');

module.exports = {
  ...base,

  testMatch: ['<rootDir>/stories/storyshots.js'],

  setupFiles: [
    ...setupFiles,
    // storybook polyfills
    '<rootDir>/.jest/registerContext.js',
  ],
};
