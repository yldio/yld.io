const MEETUP_API_KEY = '8pp5s993ns3an32t6s4t56rjur'
const MEETUP_API_SECRET = 'i68peb5ls5r0tcu5kcsrh77rcr'

const meetup = require('meetup-api')({
  oauth: {
    key: MEETUP_API_KEY,
    secret: MEETUP_API_SECRET
  }
})

const { LAMBDA_ENV } = process.env
const isProd = LAMBDA_ENV === 'production'
const redirect = `${
  isProd ? 'https://yld.io/.netlify/functions' : 'http://localhost:9000'
}/meetup-callback`

const params = {
  redirect
}

exports.handler = (evt, ctx, callback) => {
  const {
    queryStringParameters: { code }
  } = evt

  meetup.getOAuth2RequestToken(params, err => {
    if (err) {
      throw new Error(err)
    }

    meetup.getOAuth2AccessToken(code, (...rest) => {
      // const groups = meetup.getSelfGroups()

      callback(null, {
        statusCode: 200
      })
    })
  })
}
