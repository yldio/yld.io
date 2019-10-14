/* eslint-env jest */
import blogLambda from '../../../src/functions/blog-export'

jest.mock('got')
jest.mock('contentful-management', () => ({
  createClient: jest.fn()
}))
jest.mock('../../../src/functions/blogMethods/index')
jest.mock('../../../src/functions/utils/auth', () => jest.fn((_, cb) => cb()))

const Got = require('got')
const Export = require('../../../src/functions/blogMethods/index')

describe('Blog Lambda', () => {
  it('Calls the export function with the feed output', async () => {
    const feedReturn = {
      body: 'body_return'
    }

    Got.mockReturnValueOnce(feedReturn)
    Export.mockReturnValueOnce()

    await blogLambda.handler()

    expect(Got).toHaveBeenCalledWith('https://medium.com/feed/yld-blog')
    expect(Export).toHaveBeenCalledWith([feedReturn.body])
  })

  it('Returns the correctly shaped data', async () => {
    const feedReturn = {
      body: 'body_return'
    }
    const exportReturn = [
      {
        body: 'body_return'
      }
    ]

    Got.mockReturnValueOnce(feedReturn)
    Export.mockReturnValueOnce(exportReturn)

    const res = await blogLambda.handler()

    expect(res).toEqual({
      statusCode: 200,
      body: exportReturn
    })
  })

  it('Throws an error when Export throws an error', async () => {
    const feedReturn = {
      body: 'body_return'
    }

    Got.mockReturnValueOnce(feedReturn)
    Export.mockRejectedValueOnce('Error')

    try {
      await blogLambda.handler()
    } catch (error) {
      expect(error).toEqual(new Error('Error'))
    }
  })
})
