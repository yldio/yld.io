const Got = require('got')

const { MEETUP_API_KEY, LAMBDA_ENV } = process.env
const isProd = LAMBDA_ENV === 'production'

const redirect = `${
  isProd ? 'https://yld.io/.netlify/functions' : 'http://localhost:9000'
}/meetup-callback`

exports.handler = async () => {
  const searchParams = new URLSearchParams([
    ['client_id', MEETUP_API_KEY],
    ['redirect_uri', redirect],
    ['response_type', 'anonymous_code']
  ])

  const { body } = await Got(
    `https://secure.meetup.com/oauth2/authorize?${searchParams.toString()}`
  )

  return {
    statusCode: 200,
    body
  }
}
