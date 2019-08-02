/* eslint-env jest */
process.env.CONTENTFUL_SPACE = 'yld_mock_contentful_space'
process.env.CMS_CRUD = 'yld_mock_CMS_CRUD'
process.env.GITHUB_TOKEN = 'yld_mock_Github_token'

// need to mock environment
const contentfulEnvironmentMock = 'mock environment'

const handler = require('../src/functions/github')

jest.mock('../src/functions/oss/repos')
const Repos = require('../src/functions/oss/repos')

jest.mock('../src/functions/oss/meta')
const Meta = require('../src/functions/oss/meta')

jest.mock('@yldio/oss-stats')
const { getData = require('@yldio/oss-stats')

// eslint-disable-next-line
describe('Github lambda', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the repo and meta scripts with the correct arguments and returns the correct data', async () => {
    const metaResponseData = {
      meta: {
        openSourceMetaPullRequestsCount: 4276,
        openSourceMetaReposCount: 1017
      }
    }
    const repoResponseData = { updatedRepos: 'No repos updated' }

    const getDataResponseData = {
      repos: repoResponseData,
      openSourceMetaPullRequestsCount: 4276,
      openSourceMetaReposCount: 1017
    }

    const repoMock = Repos.mockResolvedValue(repoResponseData)
    const metaMock = Meta.mockResolvedValue(metaResponseData)
    // const getDataMock = getData.mockResolvedValue(getDataResponseData)
    const getDataMock = getData.mockResolvedValue(getDataResponseData)

    const githubResponse = await handler()
    const { output } = JSON.parse(githubResponse)

    expect(repoMock).toHaveBeenCalledWith(
      contentfulEnvironmentMock,
      getDataMock
    )

    expect(metaMock).toHaveBeenCalledWith(
      contentfulEnvironmentMock,
      getDataMock
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
