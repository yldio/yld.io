const { MEETUP_API_SECRET, MEETUP_API_KEY, MEETUP_REFRESH_TOKEN } = process.env

const Got = require('got')

exports.handler = async () => {
  const { body } = await Got.post('https://secure.meetup.com/oauth2/access', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded '
    },
    body: `client_id=${MEETUP_API_KEY}&client_secret=${MEETUP_API_SECRET}&grant_type=refresh_token&refresh_token=${MEETUP_REFRESH_TOKEN}`
  })

  const { access_token } = JSON.parse(body)

  return {
    statusCode: 200,
    body: 'yessir'
  }
}
