/* eslint-disable no-console */
/**
 *
 * This lambda is to keep yld members data up to date on Contentful
 *
 * lambda triggered --> get member log stored in contentful --> get current member data --> generate new member data from log --> if any differences, write new data to contentful
 */

const OssStats = require('@yldio/oss-stats');
const { createClient } = require('contentful-management');
const { head, isEqual } = require('lodash');

const Auth = require('./utils/auth');

exports.handler = async evt =>
  Auth(evt, async () => {
    const { getOrgMembers } = OssStats.org;
    const {
      CONTENTFUL_SPACE,
      CMS_CRUD,
      GITHUB_TOKEN,
      LAMBDA_ENV = 'development',
    } = process.env;
    const isProd = LAMBDA_ENV === 'production';

    if ((!CONTENTFUL_SPACE, !CMS_CRUD, !GITHUB_TOKEN)) {
      throw new Error(`Missing env variables, check set up`);
    }

    // Get contentful data
    const client = createClient({
      accessToken: CMS_CRUD,
    });

    const space = await client.getSpace(CONTENTFUL_SPACE);
    const environment = await space.getEnvironment('master');

    const {
      items: [
        {
          fields: { log },
        },
      ],
    } = await environment.getEntries({
      content_type: 'memberLog',
    });

    const membersLog = log['en-US'];

    const members = await getOrgMembers(membersLog);

    const { items: membersData } = await environment.getEntries({
      content_type: 'membersData',
    });

    const contentfulEntry = head(membersData);

    const {
      fields: { membersDetails },
    } = contentfulEntry;

    const fieldsAreEqual = isEqual(members, membersDetails.members);

    if (isProd && !fieldsAreEqual) {
      contentfulEntry.fields = {
        ...contentfulEntry.fields,
        membersDetails: { members },
      };
      const id = await contentfulEntry.update();
      const updatedEntry = await environment.getEntry(id.sys.id);

      console.log(
        `Publishing updated entry for memberDetails`,
        JSON.stringify(contentfulEntry.fields, null, 2),
      );
      await updatedEntry.publish();
    } else {
      console.log(
        fieldsAreEqual
          ? `Values for github meta data have not changed. Not updating!`
          : `Not prod so not updating contentful github meta data `,
        JSON.stringify(
          {
            generatedMembersDetails: members,
          },
          null,
          2,
        ),
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        members,
      }),
    };
  });
