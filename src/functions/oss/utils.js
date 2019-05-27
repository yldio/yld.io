const { get } = require('lodash')

const { LOCALE = 'en-US' } = process.env

const getInFields = locale => (obj, key) => get(obj, `fields.${key}.${locale}`)

const getFieldValue = getInFields(LOCALE)

const generateContentfulDataType = (obj, keys) =>
  keys.reduce((acc, curr) => ({ ...acc, [curr]: { [LOCALE]: obj[curr] } }), {})

const getContentfulMeta = (data, keys) =>
  keys.reduce(
    (acc, curr) => ({ ...acc, [curr]: getFieldValue(data, curr) }),
    {}
  )

module.exports = { generateContentfulDataType, getContentfulMeta }
