const { LAMBDA_ENV = 'development' } = process.env
const { head, isEqual } = require('lodash')

const {
  getContentfulDataFromKeys,
  generateContentfulData,
  updateEntry
} = require('./utils')

const metaKeys = ['repoCount', 'pullRequestCount']

const Meta = async (environment, githubMetaData) => {
  const isProd = LAMBDA_ENV === 'production'

  const { items: contentfulMetas } = await environment.getEntries({
    limit: 1000,
    content_type: 'githubOpenSourceMeta'
  })

  const currentContentfulData = head(contentfulMetas)

  const contentfulMetaData = getContentfulDataFromKeys(
    currentContentfulData,
    metaKeys
  )

  const fieldsAreEqual = !isEqual(contentfulMetaData, githubMetaData)

  if (isProd && !fieldsAreEqual) {
    await updateEntry(
      currentContentfulData,
      generateContentfulData(githubMetaData, metaKeys),
      environment,
      'github meta data'
    )
  } else {
    console.log(
      fieldsAreEqual
        ? `Values for github meta data have not changed. Not updating!`
        : `Not prod so not updating contentful github meta data `,
      JSON.stringify(
        {
          contentful: { ...contentfulMetaData },
          github: { ...githubMetaData }
        },
        null,
        2
      )
    )
  }

  return fieldsAreEqual ? contentfulMetaData : githubMetaData
}
module.exports = Meta
