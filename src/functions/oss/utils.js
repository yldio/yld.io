const { get } = require('lodash')

const { LOCALE = 'en-US' } = process.env

const getFieldValue = (obj, key) => get(obj, `fields.${key}.${LOCALE}`)

const generateContentfulData = (obj, keys) =>
  keys.reduce((acc, curr) => ({ ...acc, [curr]: { [LOCALE]: obj[curr] } }), {})

const getContentfulDataFromKeys = (data, keys) =>
  keys.reduce(
    (acc, curr) => ({ ...acc, [curr]: getFieldValue(data, curr) }),
    {}
  )

const updateEntry = async (contentfulEntry, githubEntry, environment, key) => {
  contentfulEntry.fields = githubEntry

  const id = await contentfulEntry.update()
  const updatedEntry = await environment.getEntry(id.sys.id)

  console.log(`Publishing updated entry for ${key}`)
  await updatedEntry.publish()
}

module.exports = {
  generateContentfulData,
  getContentfulDataFromKeys,
  getFieldValue,
  updateEntry
}
