const got = require('got')
const { parse, format } = require('url')
const isEqual = require('lodash.isequal')

/**
 *
 * This lambda is used to check for any differences in roles listed on yld.io
 * and our lever account. If any new changes are found we trigger a new site deployment.
 *
 * The yld.io/meta.json endpoint is created on the postBuild method of gatsby.
 * See gatsby-node.js for more detials.
 *
 * I've not found a way to test this in a deploy preview as we have no reference to the
 * deploy url e.g. "https://deploy-preview-203--yldio.netlify.com/.netlify/functions/lever"
 * so have no way of getting to the `/meta.json` endpoint.
 */
const {
  URL,
  LAMBDA_ENV = 'production',
  LAMBDA_LEVER_WEBHOOK // Set up in Netlify UI
} = process.env

exports.handler = async (event, context) => {
  const isProd = LAMBDA_ENV === 'production'

  const metaHref = format({
    ...parse(isProd ? URL : 'http://localhost:8000'),
    pathname: '/meta.json'
  })

  const leverHref = format({
    ...parse('https://api.lever.co'),
    pathname: '/v0/postings/yld',
    query: {
      mode: 'json'
    }
  })

  const { body: metaBody } = await got(metaHref, { json: true })
  const { body: leverBody } = await got(leverHref, { json: true })

  const { allJobIds = [] } = metaBody
  const leverJobIds =
    leverBody && leverBody.length && leverBody.map(({ id }) => id)

  if (!isEqual(allJobIds.sort(), leverJobIds.sort())) {
    if (isProd) {
      const { body } = await got(LAMBDA_LEVER_WEBHOOK)

      return {
        status: 200,
        body
      }
    } else {
      return {
        status: 200,
        body:
          'Difference in jobs found but this is not production so no deployment for you'
      }
    }
  }

  return {
    body: 'No differences in jobs found, not deploying',
    statusCode: 200
  }
}
