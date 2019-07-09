const { default: parseToken } = require('parse-bearer-token')

const { LAMBDA_AUTH_TOKEN } = process.env

const auth = (event, cb) => {
  const token = parseToken(event)

  if (!token) {
    throw new Error('Unable to read auth token')
  }

  return Object.is(token, LAMBDA_AUTH_TOKEN)
    ? cb()
    : {
        statusCode: 401,
        body: 'Not authenticated'
      }
}

module.exports = auth
