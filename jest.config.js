module.exports = {
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },

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
    'jest-extended/all',
    '@testing-library/react',
    '@testing-library/jest-dom/extend-expect',
  ],

  transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script)/)`],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
