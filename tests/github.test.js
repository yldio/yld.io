/* eslint-env jest */
// import ossStats, { getData } from '@yldio/oss-stats'
// const getDataMock = data =>
//   jest.mock('@yldio/oss-stats', () => ({
//     getData: jest.fn(() => data)
//   }))

import YldioOssStats from '../__mocks__/yldio-oss-stats'

process.env.CONTENTFUL_SPACE = 'yld_mock_contentful_space'
process.env.CMS_CRUD = 'yld_mock_CMS_CRUD'
process.env.GITHUB_TOKEN = 'yld_mock_Github_token'

// need to mock environment
const contentfulEnvironmentMock = 'mock environment'

const github = require('../src/functions/github')

jest.mock('../src/functions/oss/repos')
const Repos = require('../src/functions/oss/repos')
const repoMock = repoData => Repos.mockResolvedValue(repoData)

jest.mock('../src/functions/oss/meta')
const Meta = require('../src/functions/oss/meta')
const metaMock = metaData => Meta.mockResolvedValue(metaData)
// const YldioOssStats = require('../__mocks__/yldio-oss-stats')

// jest.genMockFromModule('@yldio/oss-stats')
// jest.mock('@yldio/oss-stats')
// const { getData } = require('@yldio/oss-stats')
// const getDataMock = data => getData.mockResolvedValue(data)

// eslint-disable-next-line
describe('Github lambda', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the repo and meta scripts with the correct arguments and returns the correct data', async () => {
    const repoResponseData = [
      {
        url: 'https://github.com/yldio/fake-repo',
        nameWithOwner: 'yldio/fake-repo',
        descriptionHTML: '<div>This is fake! It does not exist!</div>',
        starCount: 72,
        pullRequestCount: 3,
        topics: [],
        pullRequests: [
          'MDExOlB1bGxSZXF1ZXN0Nzc1MzkzMDc=',
          'MDExOlB1bGxSZXF1ZXN0MTM2MzY1MDU5',
          'MDExOlB1bGxSZXF1ZXN0MTUxNjY4NzY0'
        ],
        contributors: ['yldio'],
        pullRequestsRank: 85,
        starsRank: 366,
        rank: 451
      },
      {
        url: 'https://github.com/yldio/another-fake-repo',
        nameWithOwner: 'yldio/another-fake-repo',
        descriptionHTML: '<div>This is fake as well! It does not exist!</div>',
        starCount: 62,
        pullRequestCount: 2,
        topics: [],
        pullRequests: [
          'MDExOlB1bGxSZXF1ZXN0MjUzNDI2MDA1',
          'MDExOlB1bGxSZXF1ZXN0MjUzNDU4MTUx'
        ],
        contributors: ['yldio'],
        pullRequestsRank: 69,
        starsRank: 123,
        rank: 294
      }
    ]

    repoMock(repoResponseData)

    const metaResponseData = {
      meta: {
        openSourceMetaPullRequestsCount: 4276,
        openSourceMetaReposCount: 1017
      }
    }
    metaMock(metaResponseData)

    const getDataResponseData = {
      repos: repoResponseData, // TypeError: Cannot destructure property `repos` of 'undefined' or 'null'.
      //   ...metaResponseData.meta,
      repoCount: metaResponseData.meta.openSourceMetaReposCount,
      pullRequestCount: metaResponseData.meta.openSourceMetaPullRequestsCount
    }
    YldioOssStats.getData(getDataResponseData)

    const githubResponse = await github.handler({
      headers: {
        authorization: 'basic authorised_header'
      }
    })

    const { output } = JSON.parse(githubResponse)

    expect(repoMock).toHaveBeenCalledWith(
      contentfulEnvironmentMock,
      YldioOssStats.getData
    )

    expect(metaMock).toHaveBeenCalledWith(
      contentfulEnvironmentMock,
      YldioOssStats.getData
    )

    // expect(
    //   githubResponse.toDeepEqual({
    //     statusCode: 200,
    //     body: JSON.stringify({ metaResponseData, repoResponseData })
    //   })
    // )
    expect(output).toEqual({
      statusCode: 200,
      body: JSON.stringify({ metaResponseData, repoResponseData })
    })
  })
})
