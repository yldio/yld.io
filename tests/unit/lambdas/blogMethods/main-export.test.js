const MainExport = require('../../../../src/functions/blogMethods')
jest.mock('../../../../src/functions/utils/is-prod', () => false)
// eslint-disable-next-line no-unused-vars
const contentful = require('contentful-management')

const mockGetEntries = jest.fn()
const mockGetEnvironment = jest.fn(() => ({
  getEntries: mockGetEntries
}))

jest.mock('contentful-management', () => ({
  createClient: jest.fn(() => ({
    getSpace: jest.fn(() => ({
      getEnvironment: mockGetEnvironment
    }))
  }))
}))

const mockParseXMLToJSON = jest.fn(a => a)

jest.mock(
  '../../../../src/functions/blogMethods/parse-xml-to-json',
  () => mockParseXMLToJSON
)
jest.mock('../../../../src/functions/blogMethods/parse-html-to-markdown')
jest.mock('../../../../src/functions/blogMethods/transform-custom-mdx')
jest.mock('../../../../src/functions/blogMethods/publish-to-contentful')
jest.mock('../../../../src/functions/blogMethods/transpile-all-posts')
jest.mock('../../../../src/functions/blogMethods/transform-meta-data')

describe('MainExport', () => {
  it('should run correctly', async () => {
    console.log({ MainExport })

    const result = await MainExport()
  })

  it('should throw an error when there is missing data', async () => {
    await expect(MainExport()).rejects.toThrow()
  })
})
