jest.mock('../../../src/functions/utils/auth', () => jest.fn((_, cb) => cb()))

const { URL } = require('url')

const lambda = require('../../../src/functions/lever')

const got = require('got')
jest.mock('got')

const LAMBDA_LEVER_WEBHOOK = 'https://webhook.netlify.com'
const NETLIFY_URL = 'https://netlify.com'

process.env.URL = NETLIFY_URL
process.env.LAMBDA_LEVER_WEBHOOK = LAMBDA_LEVER_WEBHOOK
process.env.LAMBDA_ENV = 'production'

const metaHref = new URL(`${NETLIFY_URL}/meta.json`)
const leverHref = new URL('https://api.lever.co/v0/postings/yld?mode=json')

describe('Lever', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fires a request to the LAMBDA_LEVER_WEBHOOK url when there are differences in jobs', async () => {
    got.mockReturnValueOnce({
      body: {
        allJobIds: ['one', 'two', 'three', 'four', 'five']
      }
    })

    got.mockReturnValueOnce({
      body: [
        {
          id: 'one'
        },
        {
          id: 'two'
        },
        {
          id: 'three'
        },
        {
          id: 'four'
        }
      ]
    })

    got.post.mockReturnValueOnce({ body: 'Updated' })

    const response = await lambda.handler()

    const expected = {
      body: 'Updated',
      statusCode: 200
    }

    expect(response).toStrictEqual(expected)
    expect(got).toHaveBeenCalledWith(metaHref, {
      json: true
    })
    expect(got).toHaveBeenCalledWith(leverHref, { json: true })
    expect(got.post).toHaveBeenCalledWith(LAMBDA_LEVER_WEBHOOK)
  })

  it('returns 200 and no difference in body', async () => {
    got.mockReturnValueOnce({
      body: {
        allJobIds: ['one']
      }
    })

    got.mockReturnValueOnce({
      body: [
        {
          id: 'one'
        }
      ]
    })

    const response = await lambda.handler()
    const expected = {
      statusCode: 200,
      body: 'No differences in jobs found, not deploying'
    }
    expect(response).toStrictEqual(expected)
  })
})
