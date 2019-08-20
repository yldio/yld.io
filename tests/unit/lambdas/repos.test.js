/* eslint-env jest */
import ReposLambda from '../../../src/functions/oss/repos'

/* careful: No console log can be used within the test or relevant files
as long as console log is mocked. To log the mock needs to be disabled */
// eslint-disable-next-line
// console.log = jest.fn()

import ossUtils from '../../../src/functions/oss/utils'
const updateEntrySpy = jest.spyOn(ossUtils, 'updateEntry')

process.env.LAMBDA_ENV = 'production'

const sameRepoOne = {
  url: 'https://github.com/yldio/fake-repo',
  nameWithOwner: 'yldio/fake-repo',
  descriptionHTML: '<div>This is a fake repo.</div>',
  starCount: 10924,
  pullRequestCount: 4
}

const differentRepoOne = Object.assign({}, sameRepoOne)
differentRepoOne.pullRequestCount = 6

const sameRepoTwo = {
  url: 'https://github.com/yldio/another-fake-repo',
  nameWithOwner: 'yldio/another-fake-repo',
  descriptionHTML: '<div>This is another fake repo.</div>',
  starCount: 8724,
  pullRequestCount: 3
}

const contentfulRepoOne = {
  fields: {
    url: {
      'en-US': 'https://github.com/yldio/fake-repo'
    },
    nameWithOwner: {
      'en-US': 'yldio/fake-repo'
    },
    descriptionHTML: {
      'en-US': '<div>This is a fake repo.</div>'
    },
    pullRequestCount: {
      'en-US': 4
    },
    starCount: {
      'en-US': 10924
    }
  }
}

const contentfulRepoTwo = {
  fields: {
    url: {
      'en-US': 'https://github.com/yldio/another-fake-repo'
    },
    nameWithOwner: {
      'en-US': 'yldio/another-fake-repo'
    },
    descriptionHTML: {
      'en-US': '<div>This is another fake repo.</div>'
    },
    pullRequestCount: {
      'en-US': 3
    },
    starCount: {
      'en-US': 8724
    }
  }
}

let mockedContentfulRepos = [contentfulRepoOne, contentfulRepoTwo]

describe('Repos lambda', () => {
  let mockedEnvironment

  beforeEach(() => {
    mockedEnvironment = {
      getEntries: jest.fn().mockReturnValue({ items: mockedContentfulRepos })
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /* We know that the only two values that can change the outcome of the script
  are the `repos` and `contentfulRepos` */
  describe('with repos and contentfulRepos having the same values', () => {
    it('should not call updateEntry and no changes should be returned', async () => {
      const response = await ReposLambda(mockedEnvironment, {
        repos: [sameRepoOne, sameRepoTwo]
      })

      expect(updateEntrySpy).not.toHaveBeenCalled()

      const noChangesExpected = []

      expect(response).toStrictEqual(noChangesExpected)
    })
  })

  describe('with repos and contentfulRepos having different values', () => {
    it('should call updateEntry and return the changes', async () => {})
  })
})
