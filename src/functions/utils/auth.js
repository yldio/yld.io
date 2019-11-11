const { LAMBDA_AUTH_TOKEN } = process.env;

const parseBasicToken = req => {
  const auth = req.headers ? req.headers.authorization || null : null;

  if (!auth) {
    return null;
  }

  const parts = auth.split(' ');

  // Malformed header.
  if (parts.length < 2) {
    return null;
  }

  const schema = parts.shift().toLowerCase();
  const token = parts.join(' ');

  if (schema !== 'basic') {
    return null;
  }

  return token;
};

const auth = (event, cb) => {
  const token = parseBasicToken(event);

  if (!token) {
    throw new Error('Unable to read auth token');
  }

  return Object.is(token, LAMBDA_AUTH_TOKEN)
    ? cb()
    : {
        statusCode: 401,
        body: 'Not authenticated',
      };
};

module.exports = auth;
