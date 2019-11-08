const ParseXMLToJSON = require('../../../../src/functions/blogMethods/parse-xml-to-json')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const xml = readFileSync(resolve(__dirname, '../__fixtures__/medium-posts.xml'))
let result
beforeAll(async () => {
  result = await ParseXMLToJSON(xml)
})

it('creates a post object for each XML item', () => {
  expect(result).toHaveLength(3)
})

it('copies the title', () => {
  expect(result[0]).toHaveProperty(
    'title',
    'Easier GraphQL wrappers for your REST API’s'
  )
})

it('copies the link', () => {
  expect(result[0]).toHaveProperty(
    'link',
    'https://medium.com/yld-blog/easier-graphql-wrappers-for-your-rest-apis-1410b0b5446d'
  )
})

describe('tags:', () => {
  it('creates an empty tags array if there are no categories', () => {
    expect(result[0]).toHaveProperty('tags', [])
  })

  it('converts a single category to a single tag', () => {
    expect(result[1]).toHaveProperty('tags', ['javascript'])
  })

  it('converts multiple categories to multiple tags', () => {
    expect(result[2]).toHaveProperty('tags', [
      'javascript',
      'api',
      'rest',
      'graphql',
      'apollo'
    ])
  })
})

it('sets the dc:creator as the authorName', () => {
  expect(result[0]).toHaveProperty('authorName', 'Sara Vieira')
})

it('sets the pubDate as firstPublishedAt in ISO8601 format', () => {
  expect(result[0]).toHaveProperty(
    'firstPublishedAt',
    '2018-12-17T08:52:40.000Z'
  )
})

it('sets the content:encoded as the html', () => {
  expect(result[0]).toHaveProperty(
    'html',
    '<h1>Titles goes inside h1s</h1><p>Some paragraph text goes inside a p tag</p><img src="https://test.com" alt="alt stuff">'
  )
})

it('uses the last URL segment of the link without the hex UID as a slug', () => {
  expect(result[0]).toHaveProperty(
    'slug',
    'easier-graphql-wrappers-for-your-rest-apis'
  )
})
