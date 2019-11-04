const ParseXMLToJSON = require('../../../../src/functions/blogMethods/parse-xml-to-json')
const data = require('./__mocks__/parse-xml-to-json')

describe('ParseXMLToJSON', () => {
  it('parses and outputs the correctly shaped data', async () => {
    const result = await ParseXMLToJSON(data)
    const expected = [
      {
        authorName: 'Sara Vieira',
        firstPublishedAt: '2018-12-17T08:52:40.000Z',
        html:
          '<h1>Titles goes inside h1s</h1><p>Some paragraph text goes inside a p tag</p><img src="https://test.com" alt="alt stuff">',
        link:
          'https://medium.com/yld-blog/easier-graphql-wrappers-for-your-rest-apis-1410b0b5446d',
        slug: 'easier-graphql-wrappers-for-your-rest-apis-1410b0b5446d',
        tags: ['javascript'],
        title: 'Easier GraphQL wrappers for your REST API’s'
      },
      {
        authorName: 'Sara Vieira',
        firstPublishedAt: '2018-12-17T08:52:40.000Z',
        html:
          '<h1>Another title goes inside an h1</h1><p>More paragraph text goes inside another p tag</p><img src="https://test.com" alt="alt stuff">',
        link:
          'https://medium.com/yld-blog/easier-graphql-wrappers-for-your-rest-apis-1410b0b5446d',
        slug: 'easier-graphql-wrappers-for-your-rest-apis-1410b0b5446d',
        tags: ['javascript', 'api', 'rest', 'graphql', 'apollo'],
        title: 'Easier GraphQL wrappers for your REST API’s'
      }
    ]
    expect(result).toEqual(expected)
  })
})
