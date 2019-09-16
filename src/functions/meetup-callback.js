const { MEETUP_API_SECRET, MEETUP_API_KEY, MEETUP_REFRESH_TOKEN } = process.env

const Got = require('got')

const createAuthenticatedRequest = access_token => (url, options = {}) =>
  Got(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${access_token}` }
  })

exports.handler = async () => {
  const { body } = await Got.post('https://secure.meetup.com/oauth2/access', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded '
    },
    body: `client_id=${MEETUP_API_KEY}&client_secret=${MEETUP_API_SECRET}&grant_type=refresh_token&refresh_token=${MEETUP_REFRESH_TOKEN}`
  })

  const { access_token } = JSON.parse(body)
  const AuthenticatedRequest = createAuthenticatedRequest(access_token)

  const { body: groups } = await AuthenticatedRequest(
    'https://api.meetup.com/self/groups'
  )

  console.log({ groups })

  return {
    statusCode: 200,
    body: JSON.stringify({ groups })
  }
}
