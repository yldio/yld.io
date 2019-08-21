/* eslint-disable no-console */
const { LAMBDA_ENV = 'development' } = process.env
const { head, isEqual } = require('lodash')

const ossUtils = require('./utils')

const contentfulMetaKeys = [
  'openSourceMetaReposCount',
  'openSourceMetaPullRequestsCount'
]

const Meta = async (environment, githubMetaData) => {
  const isProd = LAMBDA_ENV === 'production'
  const {
    getContentfulDataFromKeys,
    generateContentfulData,
    updateEntry
  } = ossUtils

  const { items: contentfulMetas } = await environment.getEntries({
    limit: 1000,
    content_type: 'openSourcePage'
  })

  const currentContentfulData = head(contentfulMetas)

  const contentfulMetaData = getContentfulDataFromKeys(
    currentContentfulData,
    contentfulMetaKeys
  )

  const fieldsAreEqual = isEqual(contentfulMetaData, githubMetaData)

  if (isProd && !fieldsAreEqual) {
    await updateEntry(
      currentContentfulData,
      generateContentfulData(githubMetaData, contentfulMetaKeys),
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
