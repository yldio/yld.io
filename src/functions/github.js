/* eslint-disable no-console */
/**
 *
 * This lambda is to keep selected repo data up to date on Contentful
 *
 * lambda triggered --> get repo urls stored in contentful --> get current contentful data -->  get current github data --> if any differences, write new data to contentful
 */
const { createClient } = require('contentful-management');

const Auth = require('./utils/auth');
const Meta = require('./oss/meta');
const Repos = require('./oss/repos');
const { LOCALE } = require('./utils/constants');

exports.handler = async evt =>
  Auth(evt, async () => {
    const { CONTENTFUL_SPACE, CMS_CRUD, GITHUB_TOKEN } = process.env;

    if ((!CONTENTFUL_SPACE, !CMS_CRUD, !GITHUB_TOKEN)) {
      throw new Error(`Missing env variables, check set up`);
    }

    // Get contentful data
    const client = createClient({
      accessToken: CMS_CRUD,
    });

    const space = await client.getSpace(CONTENTFUL_SPACE);
    const environment = await space.getEnvironment('master');

    const { items: osContributions } = await environment.getEntries({
      content_type: 'osContributions',
    });

    const {
      contributionsByRepository,
      totalContributions,
    } = osContributions.reduce(
      (acc, curr) => {
        const {
          fields: { contributions },
        } = curr;
        // prettier-ignore
        const { contributionsByRepo, totalContributions } = contributions[LOCALE];

        contributionsByRepo.forEach(repositoryContribution => {
          const repositoryEntry = acc.contributionsByRepository.find(
            ({ repository }) =>
              repository && repository.id === repositoryContribution.id,
          );

          if (repositoryEntry) {
            repositoryEntry.contributions.totalCount +=
              repositoryContribution.totalCount;
          } else {
            acc.contributionsByRepository.push({
              repository: repositoryContribution,
              contributions: {
                totalCount: repositoryContribution.totalCount,
              },
            });
          }
        });

        acc.totalContributions += totalContributions;

        return acc;
      },
      { contributionsByRepository: [], totalContributions: 0 },
    );

    const [meta, { updatedRepos, missingRepos }] = await Promise.all([
      Meta(environment, {
        contributionsCount: totalContributions,
        reposContributedToCount: contributionsByRepository.length,
      }),
      Repos(environment, { contributionsByRepository }),
    ]).catch(err => {
      throw new Error(err);
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        meta: { ...meta },
        updatedRepos,
        missingRepos,
      }),
    };
  });
