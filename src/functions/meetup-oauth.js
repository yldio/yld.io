const URLSearchParams = require('url').URLSearchParams;
const Got = require('got');
const Auth = require('./utils/auth');

exports.handler = async evt =>
  Auth(evt, async () => {
    const { MEETUP_API_KEY, LAMBDA_ENV = 'development' } = process.env;

    if (!MEETUP_API_KEY || !LAMBDA_ENV) {
      throw new Error(`Missing env variables, check set up`);
    }

    const isProd = LAMBDA_ENV === 'production';

    const redirect = `${
      isProd ? 'https://yld.io/.netlify/functions' : 'http://localhost:9000'
    }/meetup-callback`;

    const searchParams = new URLSearchParams([
      ['client_id', MEETUP_API_KEY],
      ['redirect_uri', redirect],
      ['response_type', 'anonymous_code'],
    ]);

    const { body } = await Got(
      `https://secure.meetup.com/oauth2/authorize?${searchParams.toString()}`,
    );

    return {
      statusCode: 200,
      body,
    };
  });
