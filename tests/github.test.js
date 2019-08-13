/* eslint-env jest */
import { YldioOssStatsMock, mockedData } from '../__mocks__/@yldio/oss-stats'
import GithubLambda from '../src/functions/github'

process.env.CONTENTFUL_SPACE = 'yld_mock_contentful_space'
process.env.CMS_CRUD = 'yld_mock_CMS_CRUD'
process.env.GITHUB_TOKEN = 'yld_mock_Github_token'

// jest.mock('../src/functions/utils/auth', () => jest.fn((_, cb) => cb()))

const contentfulEnvironmentMock = 'mock environment'

jest.mock('../src/functions/oss/repos')
const Repos = require('../src/functions/oss/repos')
const repoMock = repoData => Repos.mockResolvedValue(repoData)

jest.mock('../src/functions/oss/meta')
const Meta = require('../src/functions/oss/meta')
const metaMock = metaData => Meta.mockResolvedValue(metaData)

// nb: this describe will be deleted
describe('@yldio/oss-stats mock', () => {
  it('mocks getData properly', async () => {
    const OssStatsMockResult = await YldioOssStatsMock.getData()
    expect(OssStatsMockResult).toEqual(mockedData)
  })

  it('mocks the entire function', async () => {
    // YldioOssStatsMock.getData()
    // const getDataMock = data => Promise.resolve(mockedValues)
    // YldioOssStats.getData = getDataMock

    // await YldioOssStatsMock.getData()
    // YldioOssStatsMock.normalise()
    // YldioOssStatsMock.summariseContributions()
    const result = await GithubLambda.handler({
      headers: { authorization: 'basic authorised_header' }
    })

    expect(result).toBe(true) // only purpose is to log
  })
})

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

    await repoMock(repoResponseData)

    const metaResponseData = {
      meta: {
        openSourceMetaPullRequestsCount: 4276,
        openSourceMetaReposCount: 1017
      }
    }
    await metaMock(metaResponseData)

    // const getDataResponseData = {
    //   repos: repoResponseData,
    //   repoCount: metaResponseData.meta.openSourceMetaReposCount,
    //   pullRequestCount: metaResponseData.meta.openSourceMetaPullRequestsCount
    // }
    // YldioOssStats.getData(getDataResponseData)

    const githubResponse = await GithubLambda.handler({
      headers: {
        authorization: 'basic authorised_header'
      }
    })

    const { output } = JSON.parse(githubResponse)

    expect(repoMock).toHaveBeenCalledWith(contentfulEnvironmentMock)

    expect(metaMock).toHaveBeenCalledWith(contentfulEnvironmentMock)

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
