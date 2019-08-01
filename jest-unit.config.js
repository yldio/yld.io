module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/.jest/jestPreprocess.js'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/__mocks__/fileMocks.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/.cache',
    '<rootDir>/public'
  ],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ''
  },
  testMatch: ['**/__tests__/*.js'],
  setupFiles: [
    '<rootDir>/.jest/registerContext.js',
    '<rootDir>/.jest/loaderShim.js'
  ],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/serviceWorker.js'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  coverageReporters: ['text']
}
