const { LAMBDA_ENV = 'development' } = process.env
const { head } = require('lodash')

const { getContentfulMeta } = require('./utils')

const metaKeys = ['repoCount', 'pullRequestCount']
const Meta = async (environment, githubMeta) => {
  const isProd = LAMBDA_ENV === 'production'

  const { items: contentfulMetas } = await environment.getEntries({
    limit: 1000,
    content_type: 'githubOpenSourceMeta'
  })

  const contentfulMeta = getContentfulMeta(head(contentfulMetas))
}
module.exports = Meta
