/* eslint-env jest */
import MeetupCallbackLambda from '../../../src/functions/meetup-callback';
import { generateContentfulEvent } from '../../../src/functions/utils/meetup';
import faker from 'faker';
import { when } from 'jest-when';
import { generateGroups, generateEvent } from '../__fixtures__';

const date = new Date().toISOString().split('T')[0];

// eslint-disable-next-line no-unused-vars
const contentful = require('contentful-management');

const mockEntryUpdate = jest.fn().mockResolvedValue({
  sys: {
    id: 'id_value',
  },
});

const generateContentfulEventObj = (fields) => ({
  ...generateContentfulEvent(fields),
  update: mockEntryUpdate,
});

const got = require('got');
jest.mock('got');

// This mock HAS to be prefix with `mock` otherwise jest complains
const mockGetEntries = jest.fn();
const mockCreateEntry = jest.fn().mockResolvedValue({
  sys: {
    id: 'create_entry_id',
  },
});

const mockPublish = jest.fn();
const mockGetEntry = jest.fn().mockResolvedValue({
  publish: mockPublish,
});

jest.mock('contentful-management', () => ({
  createClient: jest.fn(() => ({
    getSpace: jest.fn(() => ({
      getEnvironment: () => ({
        getEntries: mockGetEntries,
        getEntry: mockGetEntry,
        createEntry: mockCreateEntry,
      }),
    })),
  })),
}));

// Auth mock
jest.mock('../../../src/functions/utils/auth', () => jest.fn((_, cb) => cb()));

const meetUpSecret = 'szechuan_secret';
const meetUpEmail = 'hello@world.com';
const meetUpPass = 'Password';
const spaceId = 'space_id';
const cmsCrud = 'crud';
const meetUpKey = 'fake-key';
const lambdaEnv = 'production';
const queryParamCode = 'random_code';
const accessToken = 'szechuan_token';
const OAuthToken = 'super_secret_sauce';

const groupNames = ['javascript-lisbon', 'node-group-london'];

const generateMockData = (overwrites = {}) => {
  const { meetupEventOverwrites, cmsEventOverwrites } = overwrites;

  return groupNames.reduce((acc, curr) => {
    const id = faker.datatype.number();

    const meetupEvent = generateEvent({
      overwrite: { name: curr, id, ...meetupEventOverwrites },
    });

    const cmsEvent = generateEvent({
      overwrite: { name: curr, id, ...cmsEventOverwrites },
    });

    return {
      ...acc,
      [curr]: {
        meetUp: meetupEvent,
        cms: generateContentfulEventObj(cmsEvent),
      },
    };
  }, {});
};

const getCmsEvents = (events) =>
  Object.keys(events).reduce((acc, groupName) => {
    return acc.concat(events[groupName].cms);
  }, []);

describe('Meetup Callback', () => {
  beforeEach(() => {
    process.env.MEETUP_API_SECRET = meetUpSecret;
    process.env.MEETUP_API_KEY = meetUpKey;
    process.env.MEETUP_EMAIL = meetUpEmail;
    process.env.MEETUP_PASS = meetUpPass;
    process.env.CONTENTFUL_SPACE = spaceId;
    process.env.CMS_CRUD = cmsCrud;
    process.env.LAMBDA_ENV = lambdaEnv;

    /**
     * Start authentication mocks
     */

    // Create mock return for the access request
    when(got.post)
      .calledWith(
        `https://secure.meetup.com/oauth2/access?client_id=${meetUpKey}&client_secret=${meetUpSecret}&redirect_uri=https%3A%2F%2Fyld.io%2F.netlify%2Ffunctions%2Fmeetup-callback&code=${queryParamCode}&grant_type=anonymous_code`,
      )
      .mockReturnValueOnce({
        body: JSON.stringify({ access_token: accessToken }),
      });

    // Create mock return for the session request
    when(got.post)
      .calledWith(
        `https://api.meetup.com/sessions?email=${encodeURIComponent(
          meetUpEmail,
        )}&password=${meetUpPass}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .mockReturnValueOnce({
        body: JSON.stringify({ oauth_token: OAuthToken }),
      });
    /**
     * End authentication mocks
     */

    // Get meetup groups
    when(got)
      .calledWith(`https://api.meetup.com/self/groups`, {
        headers: { Authorization: `Bearer ${OAuthToken}` },
      })
      .mockReturnValue({
        body: JSON.stringify(generateGroups(groupNames.map((name) => name))),
      });
  });

  afterEach(() => {
    delete process.env.MEETUP_API_SECRET;
    delete process.env.MEETUP_API_KEY;
    delete process.env.MEETUP_EMAIL;
    delete process.env.MEETUP_PASS;
    delete process.env.CONTENTFUL_SPACE;
    delete process.env.CMS_CRUD;
    delete process.env.LAMBDA_ENV;
    jest.clearAllMocks();
  });

  it('runs correctly when there are no changes', async () => {
    // Get events from group
    const events = generateMockData({});

    groupNames.forEach((name) => {
      when(got)
        .calledWith(
          `https://api.meetup.com/${name}/events?no_earlier_than${date}`,
          { headers: { Authorization: `Bearer ${OAuthToken}` } },
        )
        .mockReturnValue({
          body: JSON.stringify({ ...events[name].meetUp }),
        });
    });

    const cmsEvents = getCmsEvents(events);

    when(mockGetEntries)
      .calledWith({
        limit: 1000,
        content_type: 'meetupEven',
        'fields.type': 'Meetup',
      })
      .mockReturnValue({ items: cmsEvents });

    const response = await MeetupCallbackLambda.handler({
      queryStringParameters: {
        code: queryParamCode,
      },
    });

    const body = JSON.stringify({
      log: {
        isProd: true,
        newEvents: [],
        updatedEvents: [],
        unchangedEvents: ['javascript-lisbon', 'node-group-london'],
      },
    });

    const expected = {
      statusCode: 200,
      body,
    };

    expect(response).toEqual(expected);
    expect(mockEntryUpdate).toHaveBeenCalledTimes(0);
  });

  it('runs correctly when there are new events', async () => {
    // Get events from group
    const events = generateMockData({});

    groupNames.forEach((name) => {
      when(got)
        .calledWith(
          `https://api.meetup.com/${name}/events?no_earlier_than${date}`,
          { headers: { Authorization: `Bearer ${OAuthToken}` } },
        )
        .mockReturnValue({
          body: JSON.stringify({ ...events[name].meetUp }),
        });
    });

    const cmsEvents = getCmsEvents(events);

    when(mockGetEntries)
      .calledWith({
        limit: 1000,
        content_type: 'meetupEven',
        'fields.type': 'Meetup',
      })
      .mockReturnValue({ items: [cmsEvents[0]] });

    const response = await MeetupCallbackLambda.handler({
      queryStringParameters: {
        code: queryParamCode,
      },
    });

    const body = JSON.stringify({
      log: {
        isProd: true,
        newEvents: ['node-group-london'],
        updatedEvents: [],
        unchangedEvents: ['javascript-lisbon'],
      },
    });

    const expected = {
      statusCode: 200,
      body,
    };

    expect(response).toEqual(expected);
    expect(mockEntryUpdate).toHaveBeenCalledTimes(0);
    expect(mockCreateEntry).toHaveBeenCalledTimes(1);
    expect(mockCreateEntry).toHaveBeenCalledWith('meetupEven', {
      fields: cmsEvents[1].fields,
    });
    expect(mockGetEntry).toHaveBeenCalledWith('create_entry_id');
    expect(mockPublish).toHaveBeenCalledTimes(1);
  });

  it('runs correctly when there are updates to events', async () => {
    const events = generateMockData({
      meetupEventOverwrites: {
        yes_rsvp_count: 100,
      },
      cmsEventOverwrites: {
        yes_rsvp_count: 10,
      },
    });

    const cmsEvents = getCmsEvents(events);

    when(mockGetEntries)
      .calledWith({
        limit: 1000,
        content_type: 'meetupEven',
        'fields.type': 'Meetup',
      })
      .mockReturnValue({ items: cmsEvents });

    groupNames.forEach((name) => {
      when(got)
        .calledWith(
          `https://api.meetup.com/${name}/events?no_earlier_than${date}`,
          { headers: { Authorization: `Bearer ${OAuthToken}` } },
        )
        .mockReturnValue({
          body: JSON.stringify({ ...events[name].meetUp }),
        });
    });

    const response = await MeetupCallbackLambda.handler({
      queryStringParameters: {
        code: queryParamCode,
      },
    });

    const body = {
      log: {
        isProd: true,
        newEvents: [],
        updatedEvents: [
          {
            name: 'javascript-lisbon',
            values: ['attendees'],
          },
          {
            name: 'node-group-london',
            values: ['attendees'],
          },
        ],
        unchangedEvents: [],
      },
    };
    const expected = {
      statusCode: 200,
      body: JSON.stringify(body),
    };

    expect(response).toEqual(expected);
    expect(mockEntryUpdate).toHaveBeenCalledTimes(2);
    expect(mockPublish).toHaveBeenCalledTimes(2);
  });

  it('throws an error when "code" is missing from query params', async () => {
    try {
      await MeetupCallbackLambda.handler({
        queryStringParameters: {
          notCode: 'val',
        },
      });
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toMatch('Missing code query parameter');
    }
  });

  it('throws an error when environment variables are missing', async () => {
    delete process.env.MEETUP_API_SECRET;
    try {
      await MeetupCallbackLambda.handler({
        queryStringParameters: {
          notCode: 'val',
        },
      });
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toMatch('Env variables missing, check set up');
    }
  });
});
