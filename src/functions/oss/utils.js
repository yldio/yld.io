/* eslint-disable no-console */
const Get = require('lodash.get')
const { LOCALE } = require('../utils/constants')

const getFieldValue = (obj, key) => Get(obj, `fields.${key}.${LOCALE}`)

const generateContentfulData = (obj, keys) => {
  if (!keys && !keys.length) {
    throw new Error('Missing key values')
  }
  return keys.reduce(
    (acc, curr) => ({ ...acc, [curr]: { [LOCALE]: obj[curr] } }),
    {}
  )
}

const getContentfulDataFromKeys = (data, keys) =>
  keys.reduce(
    (acc, curr) => ({ ...acc, [curr]: getFieldValue(data, curr) }),
    {}
  )

const updateEntry = async (contentfulEntry, githubEntry, environment, key) => {
  contentfulEntry.fields = { ...contentfulEntry.fields, ...githubEntry }

  const id = await contentfulEntry.update()
  const updatedEntry = await environment.getEntry(id.sys.id)

  console.log(
    `Publishing updated entry for ${key}`,
    JSON.stringify(contentfulEntry.fields, null, 2)
  )
  await updatedEntry.publish()
}

module.exports = {
  generateContentfulData,
  getContentfulDataFromKeys,
  getFieldValue,
  updateEntry
}
