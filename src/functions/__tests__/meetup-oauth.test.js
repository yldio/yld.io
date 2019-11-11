/* eslint-env jest */
import MeetupOAuthLambda from '../../../src/functions/meetup-oauth'

const got = require('got')
jest.mock('got')

// Auth mock
jest.mock('../../../src/functions/utils/auth', () => jest.fn((_, cb) => cb()))

const meetupApiKey = 'fake-key'
const lambdaEnv = 'production'

describe('Meetup Oauth', () => {
  beforeEach(() => {
    process.env.MEETUP_API_KEY = meetupApiKey
    process.env.LAMBDA_ENV = lambdaEnv
  })

  afterEach(() => {
    delete process.env.URL
    delete process.env.LAMBDA_LEVER_WEBHOOK
    delete process.env.LAMBDA_ENV
    jest.clearAllMocks()
  })

  it('should make a request to the meetup authorize endpoint with the correct URL search params', async () => {
    const expected = {
      statusCode: 200,
      body: 'yup'
    }
    got.mockReturnValueOnce({ body: 'yup' })
    const response = await MeetupOAuthLambda.handler()

    expect(got).toHaveBeenCalledWith(
      'https://secure.meetup.com/oauth2/authorize?client_id=fake-key&redirect_uri=https%3A%2F%2Fyld.io%2F.netlify%2Ffunctions%2Fmeetup-callback&response_type=anonymous_code'
    )
    expect(response).toEqual(expected)
  })

  it('should throw an error when environment variables are missing', async () => {
    delete process.env.MEETUP_API_KEY

    try {
      await MeetupOAuthLambda.handler()
    } catch (error) {
      expect(error.message).toMatch(`Missing env variables, check set up`)
    }
  })
})
