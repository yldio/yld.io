/* eslint-disable no-console */
const OssStats = require('@yldio/oss-stats');
const { createClient } = require('contentful-management');
const { head, isEqual } = require('lodash');

const { updateEntry } = require('./utils');
const { LOCALE } = require('../utils/constants');

const { LAMBDA_ENV = 'development' } = process.env;
const isProd = LAMBDA_ENV === 'production';
const org = 'yldio';

const updateContributionType = async contributionType => {
  const { CONTENTFUL_SPACE, CMS_CRUD, GITHUB_TOKEN } = process.env;
  const { getContributionStats } = OssStats.contributions;

  // Get contentful data
  const client = createClient({
    accessToken: CMS_CRUD,
  });

  const space = await client.getSpace(CONTENTFUL_SPACE);
  const environment = await space.getEnvironment('master');

  const { items: membersData } = await environment.getEntries({
    content_type: 'membersData',
  });

  const membersEntry = head(membersData);

  const {
    fields: { membersDetails },
  } = membersEntry;

  const { items: osContributions } = await environment.getEntries({
    content_type: 'osContributions',
  });

  const osContributionsEntry = head(osContributions);

  const {
    fields: { pullRequests },
  } = osContributionsEntry;

  // Get github data
  const {
    contributionsByRepository,
    totalContributions,
  } = await getContributionStats({
    org,
    token: GITHUB_TOKEN,
    members: membersDetails[LOCALE],
    contributionTypes: [contributionType],
  });

  const mappedContributionsByRepository = contributionsByRepository.map(
    ({ contributions, repository }) => ({
      ...repository,
      ...contributions,
    }),
  );

  const key = `${contributionType}s`;
  const newData = {
    [key]: {
      [LOCALE]: {
        contributionsByRepo: mappedContributionsByRepository,
        totalContributions,
      },
    },
  };

  const fieldsAreEqual = isEqual(pullRequests, newData.pullRequests);

  if (isProd && !fieldsAreEqual) {
    await updateEntry(
      osContributionsEntry,
      newData,
      environment,
      'osContributions',
    );
  } else {
    console.log(
      fieldsAreEqual
        ? `Values for ${contributionType} contributions have not changed. Not updating!`
        : `Not prod so not updating contentful ${contributionType} data`,
      JSON.stringify(
        {
          osContributionsEntry,
          newData,
        },
        null,
        2,
      ),
    );
  }

  return {
    contributionsByRepo: mappedContributionsByRepository,
    totalContributions,
  };
};

module.exports = updateContributionType;
