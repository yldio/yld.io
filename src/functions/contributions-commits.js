/* eslint-disable no-console */
/**
 *
 * This lambda is to keep commit contributions up to date on Contentful
 *
 * lambda triggered --> get member data and current contributions data from contenfult -> fetch new commit contributions data from github -> compare with the current contributions data, if it's different update it on contentful
 */

const Auth = require('./utils/auth');
const updateContributionType = require('./oss/updateContributionType');

exports.handler = async evt =>
  Auth(evt, async () => {
    const { CONTENTFUL_SPACE, CMS_CRUD, GITHUB_TOKEN } = process.env;

    if ((!CONTENTFUL_SPACE, !CMS_CRUD, !GITHUB_TOKEN)) {
      throw new Error(`Missing env variables, check set up`);
    }

    const {
      contributionsByRepo,
      totalContributions,
    } = await updateContributionType('commit');

    return {
      statusCode: 200,
      body: JSON.stringify({
        contributionsByRepo,
        totalContributions,
      }),
    };
  });
