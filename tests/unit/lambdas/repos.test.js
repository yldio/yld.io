/* eslint-env jest */
import ReposLambda from '../../../src/functions/oss/repos'

import ossUtils from '../../../src/functions/oss/utils'
ossUtils.updateEntry = jest.fn().mockImplementation(() => Promise.resolve(null))

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

  it('should not call updateEntry and no changes should be returned if repos and contentfulRepos have no differences', async () => {
    const response = await ReposLambda(mockedEnvironment, {
      repos: [sameRepoOne, sameRepoTwo]
    })

    expect(ossUtils.updateEntry).not.toHaveBeenCalled()

    const emptyAcc = []
    expect(response).toStrictEqual(emptyAcc)
  })

  it('should call updateEntry and return the changes if repos and contentfulRepos are different', async () => {
    const repoKeys = [
      'url',
      'nameWithOwner',
      'descriptionHTML',
      'pullRequestCount',
      'starCount'
    ]

    const response = await ReposLambda(mockedEnvironment, {
      repos: [differentRepoOne, sameRepoTwo]
    })

    expect(ossUtils.updateEntry).toHaveBeenCalledWith(
      contentfulRepoOne,
      ossUtils.generateContentfulData(differentRepoOne, repoKeys),
      mockedEnvironment,
      differentRepoOne.nameWithOwner
    )

    const changedReposAcc = [differentRepoOne.nameWithOwner]
    expect(response).toStrictEqual(changedReposAcc)
  })
})
