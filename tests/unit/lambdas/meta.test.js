/* eslint-env jest */
import MetaUtil from '../../../src/functions/oss/meta'

import ossUtils from '../../../src/functions/oss/utils'
ossUtils.updateEntry = jest.fn().mockImplementation(() => Promise.resolve(null))

process.env.LAMBDA_ENV = 'production'

const sameGithubMetaData = {
  openSourceMetaPullRequestsCount: 3886,
  openSourceMetaReposCount: 1001
}

const contentfulMetasMock = [
  {
    fields: {
      openSourceMetaPullRequestsCount: { 'en-US': 3886 },
      openSourceMetaReposCount: { 'en-US': 1001 }
    }
  }
]

describe('Github lambda - Meta util', () => {
  let mockedEnvironment

  beforeEach(() => {
    mockedEnvironment = {
      getEntries: jest.fn().mockReturnValue({ items: contentfulMetasMock })
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not call updateEntry and should return the expected data if github and contentful MetaDatas are not different', async () => {
    const response = await MetaUtil(mockedEnvironment, sameGithubMetaData)

    expect(ossUtils.updateEntry).not.toHaveBeenCalled()

    const expected = { ...sameGithubMetaData }
    expect(response).toStrictEqual(expected)
  })
})
