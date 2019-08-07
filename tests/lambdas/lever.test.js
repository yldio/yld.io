const lambda = require('../../src/functions/lever')
const got = require('got')
const url = require('url')

const leverBody = {
  allLever: {
    group: [
      {
        edges: [
          {
            node: {
              lever_id: 'cd839b3d-d68d-4d21-a68b-8038479d5c6e'
            }
          }
        ]
      },
      {
        edges: [
          {
            node: {
              lever_id: '3f8dc4d0-a310-4e8e-a637-51e9b5d7fd80'
            }
          },
          {
            node: {
              lever_id: 'e4180acb-8125-404c-adaa-8bc7b7a7b354'
            }
          },
          {
            node: {
              lever_id: 'f8066e39-8d0e-4759-b27b-8898140ec565'
            }
          },
          {
            node: {
              lever_id: '2926b1d1-7ebb-43b7-86dd-793ec44c34ae'
            }
          },
          {
            node: {
              lever_id: 'faef66f9-1ac1-4f1e-ac7e-102e9dd8d6ae'
            }
          }
        ]
      },
      {
        edges: [
          {
            node: {
              lever_id: '2dc54cf4-bbed-46c6-86bc-3042f6016432'
            }
          }
        ]
      }
    ]
  }
}

jest.mock('got')
jest.mock('url')

describe('same data', () => {
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
    expect(response.body).toBe('No differences in jobs found, not deploying')
  })
})

describe('different data', () => {
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

    got.post.mockReturnValueOnce({ body: leverBody })

    response = await lambda.handler({
      headers: {
        authorization: 'basic foo_test_thingy'
      }
    })
  })

  it('Calls the lambda lever webhook', () => {
    expect(got.post).toHaveBeenCalledTimes(1)
  })

  it('returns the response body from the lever webhook', () => {
    expect(response.body).toEqual(leverBody)
  })
})
