/* eslint-env jest */
import ReposUtil from '../../../src/functions/oss/repos';

import ossUtils from '../../../src/functions/oss/utils';
ossUtils.updateEntry = jest
  .fn()
  .mockImplementation(() => Promise.resolve(null));

const sameInputOne = {
  repository: {
    url: 'https://github.com/yldio/fake-repo',
    nameWithOwner: 'yldio/fake-repo',
    descriptionHTML: '<div>This is a fake repo.</div>',
    stargazers: { totalCount: 10924 },
  },
  contributions: { totalCount: 4 },
};

const differentInputOne = {
  repository: sameInputOne.repository,
  contributions: { totalCount: 6 },
};

const sameInputTwo = {
  repository: {
    url: 'https://github.com/yldio/another-fake-repo',
    nameWithOwner: 'yldio/another-fake-repo',
    descriptionHTML: '<div>This is another fake repo.</div>',
    stargazers: { totalCount: 8724 },
  },
  contributions: {
    totalCount: 3,
  },
};

const sameRepoOne = {
  url: 'https://github.com/yldio/fake-repo',
  nameWithOwner: 'yldio/fake-repo',
  descriptionHTML: '<div>This is a fake repo.</div>',
  starCount: 10924,
  yldContributionsCount: 4,
};

const differentRepoOne = {
  ...sameRepoOne,
  yldContributionsCount: 6,
};

const contentfulRepoOne = {
  fields: {
    url: {
      'en-US': 'https://github.com/yldio/fake-repo',
    },
    nameWithOwner: {
      'en-US': 'yldio/fake-repo',
    },
    descriptionHTML: {
      'en-US': '<div>This is a fake repo.</div>',
    },
    yldContributionsCount: {
      'en-US': 4,
    },
    starCount: {
      'en-US': 10924,
    },
  },
};

const contentfulRepoTwo = {
  fields: {
    url: {
      'en-US': 'https://github.com/yldio/another-fake-repo',
    },
    nameWithOwner: {
      'en-US': 'yldio/another-fake-repo',
    },
    descriptionHTML: {
      'en-US': '<div>This is another fake repo.</div>',
    },
    yldContributionsCount: {
      'en-US': 3,
    },
    starCount: {
      'en-US': 8724,
    },
  },
};

describe('Github lambda - Repos util', () => {
  let mockedEnvironment;

  beforeEach(() => {
    process.env.LAMBDA_ENV = 'production';
    mockedEnvironment = {
      getEntries: jest
        .fn()
        .mockReturnValue({ items: [contentfulRepoOne, contentfulRepoTwo] }),
    };
  });

  afterEach(() => {
    delete process.env.LAMBDA_ENV;
    jest.clearAllMocks();
  });

  it('should not call updateEntry and no changes should be returned if repos and contentfulRepos have no differences', async () => {
    const response = await ReposUtil(mockedEnvironment, {
      contributionsByRepository: [sameInputOne, sameInputTwo],
    });

    expect(ossUtils.updateEntry).not.toHaveBeenCalled();

    expect(response).toStrictEqual({
      updatedRepos: [],
      missingRepos: [],
    });
  });

  it('should call updateEntry and return the changes if repos and contentfulRepos are different', async () => {
    const response = await ReposUtil(mockedEnvironment, {
      contributionsByRepository: [differentInputOne, sameInputTwo],
    });

    const expectedContentfulRepoFromGithub = {
      ...contentfulRepoOne.fields,
      yldContributionsCount: { 'en-US': 6 },
    };

    expect(ossUtils.updateEntry).toHaveBeenCalledWith(
      contentfulRepoOne,
      expectedContentfulRepoFromGithub,
      mockedEnvironment,
      sameRepoOne.nameWithOwner,
    );

    const expected = {
      updatedRepos: [sameRepoOne.nameWithOwner],
      missingRepos: [],
    };
    expect(response).toStrictEqual(expected);
  });

  it('should call updateEntry once and return an array of missing repos if there are differences and github data does not contain a matching contentful repo', async () => {
    const response = await ReposUtil(mockedEnvironment, {
      contributionsByRepository: [differentInputOne],
    });

    const expectedContentfulRepoFromGithub = {
      ...contentfulRepoOne.fields,
      yldContributionsCount: { 'en-US': 6 },
    };

    expect(ossUtils.updateEntry).toHaveBeenCalledWith(
      contentfulRepoOne,
      expectedContentfulRepoFromGithub,
      mockedEnvironment,
      differentRepoOne.nameWithOwner,
    );
    expect(ossUtils.updateEntry).toHaveBeenCalledTimes(1);

    const expected = {
      updatedRepos: [differentRepoOne.nameWithOwner],
      missingRepos: [contentfulRepoTwo.fields.url['en-US']],
    };
    expect(response).toStrictEqual(expected);
  });
});
