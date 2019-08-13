/* eslint-env jest */
const YldioOssStats = require('@yldio/oss-stats')
const YldioOssStatsMock = jest.genMockFromModule('@yldio/oss-stats')

YldioOssStatsMock.normalise = YldioOssStats.normalise
YldioOssStatsMock.summariseContributions = YldioOssStats.summariseContributions

const mockedData = {
  repos: [],
  repoCount: 12,
  pullRequestsCount: 13,
  pullRequests: [],
  members: [],
  repositories: []
}

const getDataMock = jest.fn(() => Promise.resolve(mockedData))
YldioOssStatsMock.getData = getDataMock

module.exports = YldioOssStatsMock
