const Got = require('got');
const SyncMediumToContentful = require('./blogMethods');
const Auth = require('./utils/auth');

exports.handler = async (evt) =>
  Auth(evt, async () => {
    const { body, statusCode } = await Got('https://medium.com/feed/yld-blog');

    if (statusCode !== 200) {
      throw new Error('Failed to fetch medium feed', body);
    }

    const result = await SyncMediumToContentful(body);

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  });
