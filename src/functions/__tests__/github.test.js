/* eslint-env jest */
import GithubLambda from '../../../src/functions/github';
import ossStats from '@yldio/oss-stats';

/**
 * Set up all the mocks
 */
jest.mock('@yldio/oss-stats');

jest.mock('../../../src/functions/utils/auth', () => jest.fn((_, cb) => cb()));
jest.mock('../../../src/functions/oss/repos');
jest.mock('../../../src/functions/oss/meta');

const Repos = require('../../../src/functions/oss/repos');
const Meta = require('../../../src/functions/oss/meta');

const getContributionStatsMock = jest.fn();
ossStats.contributions.getContributionStats = getContributionStatsMock;

/**
 * It would be best to do this in the same way as the oss stats package
 * but for some reason jest can't find mock meta data for this package.
 * I'd really like a better way to test this, Jest doens't allow us to
 * reference mocks from outside of the factory we declare it like we're doing
 * with the Oss stats one above. But doing in the same way would error...
 *
 *
 * Having this as above would allow us to assert that createClient is called with
 * the correct environment variables...
 *
 * I'm asking around for this to create a better solution.
 */
const contentful = require('contentful-management');
jest.mock('contentful-management', () => ({
  createClient: jest.fn(() => ({
    getSpace: jest.fn(() => ({
      getEnvironment: jest.fn(name => name),
    })),
  })),
}));

/**
 *
 * This is another way of achieving the contentful mock but the module
 * declares createClients as non configurable soooo we're not able to do that here.
 * const createClient = jest.spyOn(contentful, 'createClient', 'get')
 * const getSpace = jest.spyOn(contentful, 'getSpace')
 * const getEnvironment = jest.spyOn(contentful, 'getEnvironment')
 */

// Github data

const getDataResponseData = {
  totalContributions: 4276,
  contributionsByRepository: [
    {
      contributions: {
        totalCount: 3,
      },
      repository: {
        url: 'https://github.com/yldio/fake-repo',
        nameWithOwner: 'yldio/fake-repo',
        descriptionHTML: '<div>This is fake! It does not exist!</div>',
        stargazers: { totalCount: 72 },
      },
    },
    {
      contributions: {
        totalCount: 2,
      },
      repository: {
        url: 'https://github.com/yldio/another-fake-repo',
        nameWithOwner: 'yldio/another-fake-repo',
        descriptionHTML: '<div>This is fake as well! It does not exist!</div>',
        stargazers: { totalCount: 62 },
      },
    },
  ],
};

// Contentful data
const secondRepo = {
  url: 'https://github.com/yldio/another-fake-repo',
  nameWithOwner: 'yldio/another-fake-repo',
  descriptionHTML: '<div>This is fake as well! It does not exist!</div>',
  starCount: 62,
  yldContributionsCount: 2,
};

const missingRepoUrl = 'https://github.com/missing/repo';

const metaResponseData = {
  contributionsCount: 4276,
  reposContributedToCount: getDataResponseData.contributionsByRepository.length,
};

const mockSpace = 'yld_mock_contentful_space';
const mockCmsCrud = 'yld_mock_CMS_CRUD';
const mockGithubToken = 'yld_mock_Github_token';

describe('Github lambda', () => {
  beforeEach(() => {
    process.env.CONTENTFUL_SPACE = mockSpace;
    process.env.CMS_CRUD = mockCmsCrud;
    process.env.GITHUB_TOKEN = mockGithubToken;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error when there are missing env variables', async () => {
    delete process.env.CONTENTFUL_SPACE;
    delete process.env.CMS_CRUD;
    delete process.env.GITHUB_TOKEN;

    try {
      await GithubLambda.handler();
    } catch (error) {
      expect(error.message).toMatch(`Missing env variables, check set up`);
    }
  });

  it('should return meta data an a list of changes repos when there are differences', async () => {
    // localise the mocks to return data we tell it to
    getContributionStatsMock.mockResolvedValueOnce(getDataResponseData);
    Repos.mockReturnValueOnce({ updatedRepos: [secondRepo] });
    Meta.mockReturnValueOnce(metaResponseData);

    const response = await GithubLambda.handler();
    const expected = {
      statusCode: 200,
      body: JSON.stringify({
        meta: metaResponseData,
        updatedRepos: [secondRepo],
      }),
    };
    const { createClient } = contentful;

    expect(createClient).toHaveBeenCalledWith({ accessToken: mockCmsCrud });

    // asserting its called with `master` is a bit shit here.
    // It does mean that we kind of correctly follow the contentful management module
    // chain of createClient -> getSpace -> getEnvironment but it's not ideal. Refer to
    // my comment above about trying to make this mocking of the contentful module better.
    expect(Repos).toHaveBeenCalledWith('master', {
      contributionsByRepository: getDataResponseData.contributionsByRepository,
    });
    expect(Meta).toHaveBeenCalledWith('master', { ...metaResponseData });

    expect(response).toStrictEqual(expected);
  });

  it('should return meta data when there are no updates', async () => {
    getContributionStatsMock.mockResolvedValueOnce(getDataResponseData);

    Repos.mockReturnValueOnce([]);
    Meta.mockReturnValueOnce(metaResponseData);

    const response = await GithubLambda.handler();

    expect(Repos).toHaveBeenCalledWith('master', {
      contributionsByRepository: getDataResponseData.contributionsByRepository,
    });
    expect(Meta).toHaveBeenCalledWith('master', { ...metaResponseData });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      meta: metaResponseData,
    });
  });

  it('should return meta data and an array of updatedRepos and missingRepos when there are changes and missing repos', async () => {
    getContributionStatsMock.mockResolvedValueOnce(getDataResponseData);

    Repos.mockReturnValueOnce({
      updatedRepos: [secondRepo],
      missingRepos: [missingRepoUrl],
    });
    Meta.mockReturnValueOnce(metaResponseData);

    const response = await GithubLambda.handler();
    const expected = {
      statusCode: 200,
      body: JSON.stringify({
        meta: metaResponseData,
        updatedRepos: [secondRepo],
        missingRepos: [missingRepoUrl],
      }),
    };

    expect(Repos).toHaveBeenCalledWith('master', {
      contributionsByRepository: getDataResponseData.contributionsByRepository,
    });
    expect(Meta).toHaveBeenCalledWith('master', { ...metaResponseData });
    expect(response).toStrictEqual(expected);
  });
});
