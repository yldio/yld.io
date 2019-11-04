const Got = require('got')
const Export = require('./blogMethods')
const Auth = require('./utils/auth')

exports.handler = async evt =>
  Auth(evt, async () => {
    const { body } = await Got('https://medium.com/feed/yld-blog')

    let result

    try {
      result = await Export([body])
    } catch (error) {
      throw new Error(error)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ result })
    }
  })
