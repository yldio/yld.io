const { default: parseToken } = require('parse-bearer-token')

const { LAMBDA_AUTH_TOKEN } = process.env

const auth = event => {
  const token = parseToken(event)

  if (!token) {
    throw new Error('Unable to read auth token')
  }

  return token === LAMBDA_AUTH_TOKEN
}

module.exports = auth
