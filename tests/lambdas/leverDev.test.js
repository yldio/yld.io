const lambda = require('../../src/functions/lever')
const got = require('got')
const url = require('url')

jest.mock('got')
jest.mock('url')

describe('different data, not production', () => {
  let response

  beforeAll(async () => {
    url.URL.mockReturnValueOnce({
      href: 'http://localhost:8000/meta.json',
      origin: 'http://localhost:8000',
      protocol: 'http:',
      username: '',
      password: '',
      host: 'localhost:8000',
      hostname: 'localhost',
      port: '8000',
      pathname: '/meta.json',
      search: '',
      hash: ''
    })

    url.URL.mockReturnValueOnce({
      href: 'https://api.lever.co/v0/postings/yld?mode=json',
      origin: 'https://api.lever.co',
      protocol: 'https:',
      username: '',
      password: '',
      host: 'api.lever.co',
      hostname: 'api.lever.co',
      port: '',
      pathname: '/v0/postings/yld',
      search: '?mode=json',
      hash: ''
    })

    got.mockReturnValueOnce({
      body: {
        allJobIds: ['one', 'two', 'three']
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
        },
        {
          id: 'five'
        }
      ]
    })

    response = await lambda.handler({
      headers: {
        authorization: 'basic foo_test_thingy'
      }
    })
  })

  it('returns 200 and no difference in body', async () => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(
      'Difference in jobs found but this is not production so no deployment for you'
    )
  })
})
