const nock = require('nock')
const lambda = require('../../src/functions/lever')

const getMetaBodyNock = (isProd, NETLIFY_URL) =>
  nock(`${isProd ? NETLIFY_URL : 'http://localhost:8000'}`)
    .get('/meta.json')
    .reply(200, {
      allJobIds: ['one', 'two', 'three', 'four', 'five']
    })

const leverSameDataNock = () =>
  nock('https://api.lever.co')
    .get('/v0/postings/yld')
    .query({ mode: 'json' })
    .reply(200, [
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
      },
      {
        id: 'five'
      }
    ])

describe('same data', () => {
  const { URL: NETLIFY_URL, LAMBDA_ENV = 'development' } = process.env

  const isProd = LAMBDA_ENV === 'production'

  nock.disableNetConnect()

  let response

  beforeAll(async () => {
    getMetaBodyNock(isProd, NETLIFY_URL)
    leverSameDataNock()
    response = await lambda.handler({
      headers: {
        authorization: 'basic foo_test_thingy'
      }
    })
  })

  it('returns 200 and no difference in body', async () => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('No differences in jobs found, not deploying')
  })
})
