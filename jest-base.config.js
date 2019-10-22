module.exports = {
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.jsx?$': '<rootDir>/.jest/babelTransform.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/filenameTransform.js'
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],

  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/.cache',
    '<rootDir>/public'
  ],

  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFiles: [
    '<rootDir>/.jest/registerContext.js',
    '<rootDir>/.jest/loaderShim.js'
  ]
}
