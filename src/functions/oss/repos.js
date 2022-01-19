const isEqual = require('lodash.isequal');

const ossUtils = require('./utils');

const repoKeys = [
  'url',
  'nameWithOwner',
  'descriptionHTML',
  'yldContributionsCount',
  'starCount',
];

const Repos = async (environment, { contributionsByRepository }) => {
  const { getFieldValue, generateContentfulData, updateEntry } = ossUtils;
  const { LAMBDA_ENV = 'development' } = process.env;
  const isProd = LAMBDA_ENV === 'production';
  const { items: contentfulRepos } = await environment.getEntries({
    limit: 1000,
    content_type: 'githubRepo',
  });

  // Get the urls from the repos currently on the site
  const contentfulRepoUrls = contentfulRepos.map((repo) =>
    getFieldValue(repo, 'url'),
  );

  // Get the repo data we care about
  const filteredContributionsByRepository = contributionsByRepository.filter(
    ({ repository: { url } }) => contentfulRepoUrls.includes(url),
  );

  // Iterate over the contentful repo data
  const missingRepos = [];
  const updatedRepos = [];
  await Promise.all(
    contentfulRepos.map(async (contentfulRepo) => {
      const url = getFieldValue(contentfulRepo, 'url');
      const repositoryContribution = filteredContributionsByRepository.find(
        ({ repository }) => repository.url === url,
      );
      if (!repositoryContribution) {
        console.log(`
        Contentful repo URL: ${url} cannot be found in the Github repo data.
        This happens when users leave the YLD Github organisation.
        Consider removing this repo from contentful
      `);
        missingRepos.push(url);
        return;
      }

      const {
        nameWithOwner,
        descriptionHTML,
        stargazers: { totalCount: starCount },
      } = repositoryContribution.repository;
      const { totalCount: yldContributionsCount } =
        repositoryContribution.contributions;
      const githubRepo = {
        url,
        nameWithOwner,
        descriptionHTML,
        yldContributionsCount,
        starCount,
      };

      const contentfulRepoFromGithub = generateContentfulData(
        githubRepo,
        repoKeys,
      );

      const fieldsAreEqual = isEqual(
        contentfulRepoFromGithub,
        contentfulRepo.fields,
      );

      if (isProd && !fieldsAreEqual) {
        const { nameWithOwner } = githubRepo;
        await updateEntry(
          contentfulRepo,
          contentfulRepoFromGithub,
          environment,
          nameWithOwner,
        );

        updatedRepos.push(nameWithOwner);
        return;
      }

      console.log(
        fieldsAreEqual
          ? `Fields for ${githubRepo.nameWithOwner} have not changed. Not updating!`
          : `Not prod so not updating contentful for ${githubRepo.nameWithOwner}`,
        JSON.stringify(
          {
            contentful: contentfulRepo.fields,
            github: contentfulRepoFromGithub,
          },
          null,
          2,
        ),
      );
    }),
  );

  return { updatedRepos, missingRepos };
};

module.exports = Repos;
