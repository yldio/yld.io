/* eslint-disable no-console */
const Got = require('got')
const { createClient } = require('contentful-management')
const Find = require('lodash.find')
const { default: Map } = require('apr-map')
const isEqual = require('lodash.isequal')
const {
  transformGroups,
  transformMeetupEvent,
  generateContentfulEvent
} = require('./utils/meetup')

const {
  MEETUP_API_SECRET,
  CONTENTFUL_SPACE,
  CMS_CRUD,
  MEETUP_API_KEY,
  MEETUP_REFRESH_TOKEN,
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

const handleTokenRefresh = async () => {
  const { body } = await Got.post('https://secure.meetup.com/oauth2/access', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded '
    },
    body: `client_id=${MEETUP_API_KEY}&client_secret=${MEETUP_API_SECRET}&grant_type=refresh_token&refresh_token=${MEETUP_REFRESH_TOKEN}`
  })

  return JSON.parse(body)
}

exports.handler = async () => {
  const { access_token } = await handleTokenRefresh()
  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')
  const AuthenticatedRequest = createAuthenticatedRequest(access_token)

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
    content_type: 'meetupEven'
  })

  let log = {
    isProd,
    newEvents: [],
    updatedEvents: [],
    unchangedEvents: []
  }

  await Map(parsedEvents, async event => {
    const meetup = transformMeetupEvent(event)

    const contentfulEvent = Find(events, ['fields.id.en-US', meetup.id])
    const generatedEvent = generateContentfulEvent(meetup)

    if (generatedEvent && contentfulEvent) {
      // iterates through the generatedEvent, returns an array of differing keys.
      const { fields: generatedEventFields } = generatedEvent
      const { fields: contentfulEventFields } = contentfulEvent

      const diffVals = Object.keys(generatedEventFields).reduce((acc, curr) => {
        // we don't care about homepageFeatured
        if (['homepageFeatured'].includes(curr)) {
          return acc
        }

        if (['startTime', 'endTime'].includes(curr)) {
          return new Date(contentfulEventFields[curr]['en-US']) -
            generatedEventFields[curr]['en-US'] ===
            0
            ? acc
            : [...acc, curr]
        }

        return isEqual(contentfulEventFields[curr], generatedEventFields[curr])
          ? acc
          : [...acc, curr]
      }, [])

      // If there are no differences then length will be 0
      if (diffVals && !diffVals.length) {
        log.unchangedEvents.push(meetup.eventName)
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
          name: meetup.eventName,
          values: { ...diffVals }
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
      log.newEvents.push(meetup.eventName)
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
