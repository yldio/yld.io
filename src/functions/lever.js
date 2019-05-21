const got = require('got')
const { parse, format } = require('url')
const isEqual = require('lodash.isequal')

const { URL = 'http://localhost:8000', DEPLOY_URL } = process.env
exports.handler = async (event, context, callback) => {
  console.log('------------------------')
  console.log({ URL, DEPLOY_URL })
  console.log('------------------------')
  const metaHref = format({
    ...parse(URL),
    pathname: '/meta.json'
  })

  const leverHref = format({
    ...parse('https://api.lever.co'),
    pathname: '/v0/postings/yld',
    query: {
      mode: 'json'
    }
  })

  console.log(process.env, { metaHref, leverHref })

  const { body: metaBody } = await got(metaHref, { json: true })
  const { body: leverBody } = await got(leverHref, { json: true })

  const { allJobIds = [] } = metaBody
  const leverJobIds =
    leverBody && leverBody.length && leverBody.map(({ id }) => id)

  console.log({ DEPLOY_URL })

  if (!isEqual(allJobIds.sort(), leverJobIds.sort())) {
    console.log('They are not the same, time to deploy')
    // const { body } = await got(DEPLOY_URL)
  }

  return {
    body: 'amazing',
    statusCode: 200
  }
}
