/* eslint-env jest */
const YldioOssStats = require('@yldio/oss-stats')
jest.genMockFromModule('@yldio/oss-stats')

const getDataMock = data => jest.fn().mockResolvedValue(data)
YldioOssStats.getData = getDataMock

module.exports = YldioOssStats
