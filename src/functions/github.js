/* eslint-disable no-console */
/**
 *
 * This lambda is to keep selected repo data up to date on Contentful
 *
 * lambda triggered --> get repo urls stored in contentful --> get current contentful data -->  get current github data --> if any differences, write new data to contentful
 */

const OssStats = require('@yldio/oss-stats');
const { createClient } = require('contentful-management');

const Auth = require('./utils/auth');
const Meta = require('./oss/meta');
const Repos = require('./oss/repos');

const org = 'yldio';

exports.handler = async evt =>
  Auth(evt, async () => {
    const { getContributionStats } = OssStats.contributions;
    const { CONTENTFUL_SPACE, CMS_CRUD, GITHUB_TOKEN } = process.env;

    if ((!CONTENTFUL_SPACE, !CMS_CRUD, !GITHUB_TOKEN)) {
      throw new Error(`Missing env variables, check set up`);
    }

    // Get github data
    const {
      contributionsByRepository,
      totalContributions,
    } = await getContributionStats(org, GITHUB_TOKEN);

    // Get contentful data
    const client = createClient({
      accessToken: CMS_CRUD,
    });

    const space = await client.getSpace(CONTENTFUL_SPACE);
    const environment = await space.getEnvironment('master');

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
