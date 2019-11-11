const got = require('got');
const { URL } = require('url');
const isEqual = require('lodash.isequal');

const Auth = require('./utils/auth');

/**
 *
 * This lambda is used to check for any differences in roles listed on yld.io
 * and our lever account. If any new changes are found we trigger a new site deployment.
 *
 * The yld.io/meta.json endpoint is created on the postBuild method of gatsby.
 * See gatsby-node.js for more detials.
 *
 * Unfortunately in the netlify lambda build there is no way to reference the URL of the deployment
 * context it is currently in. e.g. yld.io (production) or deploy-preview-203--yldio.netlify.com (deploy-preview).
 * Without this we cannot reliably resolve the url for the meta.json file, so the only way to reliably test
 * is locally! There are certain env variables Netlify gives to the *build* environemnt (gatsby build) but not the function
 * environemnt unfortunately.
 *
 */

exports.handler = async evt =>
  Auth(evt, async () => {
    const {
      URL: NETLIFY_URL,
      LAMBDA_ENV = 'development',
      LAMBDA_LEVER_WEBHOOK, // Set up in Netlify UI
    } = process.env;

    const isProd = LAMBDA_ENV === 'production';

    const metaHref = new URL(
      `${isProd ? NETLIFY_URL : 'http://localhost:8000'}/meta.json`,
    );

    const leverHref = new URL('https://api.lever.co/v0/postings/yld?mode=json');

    const { body: metaBody } = await got(metaHref, { json: true });
    const { body: leverBody } = await got(leverHref, { json: true });

    const { allJobIds = [] } = metaBody;
    const leverJobIds =
      leverBody && leverBody.length && leverBody.map(({ id }) => id);

    if (!isEqual(allJobIds.sort(), leverJobIds.sort())) {
      if (isProd) {
        const { body } = await got.post(LAMBDA_LEVER_WEBHOOK);

        return {
          statusCode: 200,
          body,
        };
      } else {
        return {
          statusCode: 200,
          body:
            'Difference in jobs found but this is not production so no deployment for you',
        };
      }
    }

    return {
      body: 'No differences in jobs found, not deploying',
      statusCode: 200,
    };
  });
