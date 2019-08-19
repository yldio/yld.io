/* eslint-env jest */
import ReposLambda from '../../../src/functions/oss/repos'

// eslint-disable-next-line
console.log = jest.fn()

jest.mock('../../../src/functions/oss/utils', () => ({
  getFieldValue: jest.fn(repo => repo.fields.url['en-US']),
  generateContentfulData: jest.fn(repo => {
    let contentfulRepo = Object.assign({}, repo)
    const repoUrl = repo.url
    delete repo.url
    contentfulRepo.url = {}
    contentfulRepo.url['en-US'] = repoUrl
    return contentfulRepo
  }),
  updateEntry: jest.fn(name => name)
}))

const firstRepo = {
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
}

const secondRepo = {
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

let environmentRepos = [
  Object.assign({}, firstRepo),
  Object.assign({}, secondRepo)
].map(repo => ({ fields: repo }))

environmentRepos.forEach(repo => {
  const repoUrl = repo.fields.url
  delete repo.fields.url
  repo.fields.url = {}
  repo.fields.url['en-US'] = repoUrl
})

describe('Repos lambda', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('is not production environment', () => {
    it('with equal fields, should not update and log the have not changed fields message', async () => {
      const mockedEnvironment = {
        getEntries: jest.fn().mockReturnValue({ items: environmentRepos })
      }

      const response = await ReposLambda(mockedEnvironment, {
        repos: [firstRepo, secondRepo]
      })

      // eslint-disable-next-line
      expect(console.log.mock.calls[0][0]).toBe(
        `Fields for ${firstRepo.nameWithOwner} have not changed. Not updating!`
      )

      // eslint-disable-next-line
      expect(console.log.mock.calls[1][0]).toBe(
        `Fields for ${secondRepo.nameWithOwner} have not changed. Not updating!`
      )
      expect(response).toEqual([])
    })

    it.skip('with different fields, should not update and log the have not Prod message', async () => {})
  })

  describe.skip('is production environment', () => {
    it('with equal fields, should not update  and log the have not changed fields message', async () => {
      //   expect().toEqual(`Fields for ${repoMock} have not changed. Not updating!`)
    })

    it('with different fields, should update entry and not log any message', async () => {
      //   expect().toEqual(`Fields for ${repoMock} have not changed. Not updating!`)
    })
  })
})
