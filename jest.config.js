module.exports = {
  projects: ['jest-{interaction,lighthouse,storyshots,unit}.config.js'],
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
