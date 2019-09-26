/* eslint-env jest */
import MeetupCallbackLambda from '../../../src/functions/meetup-callback'
import { when } from 'jest-when'
import { groups } from './__mocks__/meetup'

const contentful = require('contentful-management')

const got = require('got')
jest.mock('got')
jest.mock('contentful-management', () => ({
  createClient: jest.fn(() => ({
    getSpace: jest.fn(() => ({
      getEnvironment: jest.fn(name => name)
    }))
  }))
}))

// Auth mock
jest.mock('../../../src/functions/utils/auth', () => jest.fn((_, cb) => cb()))

const meetUpSecret = 'szechuan_secret'
const meetUpEmail = 'hello@world.com'
const meetUpPass = 'Password'
const spaceId = 'space_id'
const cmsCrud = 'crud'
const meetUpKey = 'fake-key'
const lambdaEnv = 'production'
const queryParamCode = 'random_code'
const accessToken = 'szechuan_token'
const OAuthToken = 'super_secret_sauce'

const groupUrlNames = ['first', 'second', 'third', 'fourth', 'fifth']

describe('Meetup Oauth', () => {
  beforeEach(() => {
    process.env.MEETUP_API_SECRET = meetUpSecret
    process.env.MEETUP_API_KEY = meetUpKey
    process.env.MEETUP_EMAIL = meetUpEmail
    process.env.MEETUP_PASS = meetUpPass
    process.env.CONTENTFUL_SPACE = spaceId
    process.env.CMS_CRUD = cmsCrud
    process.env.LAMBDA_ENV = lambdaEnv
  })

  afterEach(() => {
    delete process.env.MEETUP_API_SECRET
    delete process.env.MEETUP_API_KEY
    delete process.env.MEETUP_EMAIL
    delete process.env.MEETUP_PASS
    delete process.env.CONTENTFUL_SPACE
    delete process.env.CMS_CRUD
    delete process.env.LAMBDA_ENV
    jest.clearAllMocks()
  })

  it('runs correctly', async () => {
    // Create mock return for the access request
    when(got.post)
      .calledWith(
        `https://secure.meetup.com/oauth2/access?client_id=${meetUpKey}&client_secret=${meetUpSecret}&redirect_uri=https%3A%2F%2Fyld.io%2F.netlify%2Ffunctions%2Fmeetup-callback&code=${queryParamCode}&grant_type=anonymous_code`
      )
      .mockReturnValueOnce({
        body: JSON.stringify({ access_token: accessToken })
      })

    // Create mock return for the access request
    when(got.post)
      .calledWith(
        `https://api.meetup.com/sessions?email=${encodeURIComponent(
          meetUpEmail
        )}&password=${meetUpPass}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .mockReturnValueOnce({
        body: JSON.stringify({ oauth_token: OAuthToken })
      })

    // Get meetup groups
    when(got)
      .calledWith(`https://api.meetup.com/self/groups`, {
        headers: { Authorization: `Bearer ${OAuthToken}` }
      })
      .mockReturnValue({ body: JSON.stringify(groups(groupUrlNames)) })

    // Get events from group
    const date = new Date().toISOString().split('T')[0]

    groupUrlNames.forEach(name => {
      when(got)
        .calledWith(
          `https://api.meetup.com/${name}/events?no_earlier_than${date}`,
          { headers: { Authorization: `Bearer ${OAuthToken}` } }
        )
        .mockReturnValue()
    })

    const response = await MeetupCallbackLambda.handler({
      queryStringParameters: {
        code: queryParamCode
      }
    })
  })

  it('throws an error when "code" is missing from query params', async () => {
    try {
      await MeetupCallbackLambda.handler({
        queryStringParameters: {
          notCode: 'val'
        }
      })
    } catch (error) {
      expect(error.message).toMatch('Missing code query parameter')
    }
  })

  it('throws an error when environment variables are missing', async () => {
    delete process.env.MEETUP_API_SECRET
    try {
      await MeetupCallbackLambda.handler({
        queryStringParameters: {
          notCode: 'val'
        }
      })
    } catch (error) {
      expect(error.message).toMatch('Env variables missing, check set up')
    }
  })
})
