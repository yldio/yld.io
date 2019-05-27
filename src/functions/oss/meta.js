const { LAMBDA_ENV = 'development' } = process.env
const { get, find, isEqual, head } = require('lodash')

const Meta = async (environment, githubMeta) => {
  const { items: contentfulMetas } = await environment.getEntries({
    limit: 1000,
    content_type: 'githubOpenSourceMeta'
  })

  const contentfulMeta = getContentfulMeta(head(contentfulMetas))
}
module.exports = Meta
