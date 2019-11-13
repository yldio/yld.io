module.exports = {
  testRunner: 'jest-circus/runner',
  testURL: 'http://localhost',

  modulePathIgnorePatterns: ['<rootDir>/.cache/'],

  moduleNameMapper: {
    '.+\\.(css)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': '<rootDir>/.jest/babelTransform.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/filenameTransform.js',
  },

  // gatsby polyfills
  globals: {
    __PATH_PREFIX__: '',
  },
  setupFiles: ['<rootDir>/.jest/loaderShim.js'],

  setupFilesAfterEnv: [
    'jest-extended',
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
  ],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
