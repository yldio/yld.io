/* eslint-disable no-console */
const Got = require('got')
const { createClient } = require('contentful-management')
const Find = require('lodash.find')
const { default: Map } = require('apr-map')
const isEqual = require('lodash.isequal')
const { transformGroups, generateContentfulEvent } = require('./utils/meetup')

const {
  MEETUP_API_SECRET,
  MEETUP_API_KEY,
  MEETUP_EMAIL,
  MEETUP_PASS,
  CONTENTFUL_SPACE,
  CMS_CRUD,
  LAMBDA_ENV = 'development'
} = process.env

const isProd = LAMBDA_ENV === 'production'

const client = createClient({
  accessToken: CMS_CRUD
})

const createAuthenticatedRequest = access_token => (url, options = {}) =>
  Got(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${access_token}` }
  })

const redirect = `${
  isProd ? 'https://yld.io/.netlify/functions' : 'http://localhost:9000'
}/meetup-callback`

const getAuthToken = async code => {
  let token
  try {
    /**
     * I would usually add this to { searchParams }
     * in the Got.post options instead of .toString()
     * on the url....but it wasn't working...
     */
    const accessSearchParams = new URLSearchParams([
      ['client_id', MEETUP_API_KEY],
      ['client_secret', MEETUP_API_SECRET],
      ['redirect_uri', redirect],
      ['code', code],
      ['grant_type', 'anonymous_code']
    ])

    const { body: accessBody } = await Got.post(
      `https://secure.meetup.com/oauth2/access?${accessSearchParams.toString()}`
    )

    const { access_token } = JSON.parse(accessBody)

    const sessionSearchParams = new URLSearchParams([
      ['email', MEETUP_EMAIL],
      ['password', MEETUP_PASS]
    ])

    const { body } = await Got.post(
      `https://api.meetup.com/sessions?${sessionSearchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )

    const { oauth_token } = JSON.parse(body)

    token = oauth_token
  } catch (error) {
    throw new Error(error)
  }

  return token
}

exports.handler = async evt => {
  const { queryStringParameters } = evt

  if (!queryStringParameters.code) {
    return {
      statusCode: 400,
      body: 'Missing code query parameter'
    }
  }

  const sessionToken = await getAuthToken(queryStringParameters.code)

  const AuthenticatedRequest = createAuthenticatedRequest(sessionToken)

  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')

  const { body: groups } = await AuthenticatedRequest(
    'https://api.meetup.com/self/groups'
  )

  const transformedGroups = transformGroups(JSON.parse(groups))
  const date = new Date().toISOString().split('T')[0]

  const eventsFromGroups = await Promise.all(
    transformedGroups.map(({ urlname }) =>
      AuthenticatedRequest(
        `https://api.meetup.com/${urlname}/events?no_earlier_than${date}`
      )
    )
  )

  const parsedEvents = eventsFromGroups.reduce(
    (acc, { body }) => acc.concat(JSON.parse(body)),
    []
  )

  const { items: events } = await environment.getEntries({
    limit: 1000,
    content_type: 'meetupEven',
    'fields.type': 'Meetup'
  })

  let log = {
    isProd,
    newEvents: [],
    updatedEvents: [],
    unchangedEvents: []
  }

  await Map(parsedEvents, async event => {
    const contentfulEvent = Find(events, ['fields.id.en-US', event.id])
    const generatedEvent = generateContentfulEvent(event)
    console.log(JSON.stringify({ contentfulEvent, generatedEvent }, null, 2))

    if (generatedEvent && contentfulEvent) {
      const { fields: generatedEventFields } = generatedEvent
      const { fields: contentfulEventFields } = contentfulEvent

      const diffVals = Object.keys(generatedEventFields).reduce((acc, curr) => {
        // we don't care about homepageFeatured
        if (['homepageFeatured'].includes(curr)) {
          return acc
        }

        return isEqual(contentfulEventFields[curr], generatedEventFields[curr])
          ? acc
          : [...acc, curr]
      }, [])

      if (diffVals && !diffVals.length) {
        log.unchangedEvents.push(generatedEvent.fields.eventTitle['en-US'])
        return
      }

      // update
      contentfulEvent.fields = Object.assign(
        contentfulEvent.fields,
        diffVals.reduce(
          (acc, curr) => ({ ...acc, [curr]: generatedEventFields[curr] }),
          {}
        )
      )

      if (isProd) {
        log.updatedEvents.push({
          name: generatedEvent.fields.eventTitle['en-US'],
          values: [diffVals]
        })
        const id = await contentfulEvent.update()
        const updatedEntry = await environment.getEntry(id.sys.id)

        return updatedEntry.publish()
      } else {
        return
      }
    }

    // create
    if (isProd) {
      log.newEvents.push(generatedEvent.fields.eventTitle['en-US'])
      const id = await environment.createEntry('meetupEven', generatedEvent)
      const newEntry = await environment.getEntry(id.sys.id)

      return newEntry.publish()
    } else {
      return
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ log })
  }
}
