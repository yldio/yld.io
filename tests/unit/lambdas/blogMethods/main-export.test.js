import ParseXMLtoJSON from '../../../../src/functions/blogMethods/parse-xml-to-json'
import ParseHTMLToMarkdown from '../../../../src/functions/blogMethods/parse-html-to-markdown'
import TransformCustomMDX from '../../../../src/functions/blogMethods/transform-custom-mdx'
import PublishToContentful from '../../../../src/functions/blogMethods/publish-to-contentful'
import TranspileAllPosts from '../../../../src/functions/blogMethods/transpile-all-posts'
import TransformMetaDat from '../../../../src/functions/blogMethods/transform-meta-data'

const MainExport = require('../../../../src/functions/blogMethods')
jest.mock('../../../../src/functions/utils/is-prod', () => false)
// eslint-disable-next-line no-unused-vars
const contentful = require('contentful-management')

const mockGetEntries = jest.fn()
const mockGetContentType = jest.fn()

const mockGetEnvironment = jest.fn(() => ({
  getEntries: mockGetEntries,
  getContentType: mockGetContentType
}))

jest.mock('contentful-management', () => ({
  createClient: jest.fn(() => ({
    getSpace: jest.fn(() => ({
      getEnvironment: mockGetEnvironment
    }))
  }))
}))

jest.mock('../../../../src/functions/blogMethods/parse-xml-to-json')
jest.mock('../../../../src/functions/blogMethods/parse-html-to-markdown')
jest.mock('../../../../src/functions/blogMethods/transform-custom-mdx')
jest.mock('../../../../src/functions/blogMethods/publish-to-contentful')
jest.mock('../../../../src/functions/blogMethods/transpile-all-posts')
jest.mock('../../../../src/functions/blogMethods/transform-meta-data')

describe('MainExport', () => {
  it('should run correctly', async () => {
    mockGetEntries.mockResolvedValueOnce({
      items: [
        {
          sys: {
            id: 'post_id'
          },
          fields: {
            title: {
              'en-US': 'title'
            }
          }
        }
      ]
    })

    mockGetContentType.mockResolvedValueOnce({
      fields: [
        {
          id: 'title',
          required: true
        },
        {
          id: 'authorName',
          required: true
        },
        {
          id: 'slug',
          required: true
        },
        {
          id: 'content',
          required: true
        }
      ]
    })

    ParseXMLtoJSON.mockResolvedValueOnce({
      title: 'title'
    })

    const result = await MainExport(['data'])

    expect(mockGetContentType).toHaveBeenCalledWith('blogPost')
  })

  it('should throw an error when there is missing data', async () => {
    await expect(MainExport()).rejects.toThrow()
  })
})
