require('dotenv').config()

const { createClient } = require('contentful-management')
const { default: Map } = require('apr-map')
const { promisify } = require('util')
const find = require('lodash.find')
const striptags = require('striptags')

// Set up dot-env variables
const {
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE,
  MEETUP_KEY,
} = process.env

// Import helper functions
const generateContentfulEvent = ({
  urlname,
  nextEvent,
  venue,
  link,
  date,
  time,
  duration,
  eventName,
  description,
}) => ({
  fields: {
    thisMeetupCode: {
      'en-US': `${urlname}-${nextEvent}`,
    },
    meetupUrlName: {
      'en-US': urlname,
    },
    linkToEvent: {
      'en-US': link,
    },
    date: {
      'en-US': date,
    },
    startTime: {
      'en-US': new Date(time),
    },
    endTime: {
      'en-US': new Date(time + duration),
    },
    address: {
      'en-US':
        venue !== 'Venue To Be Confirmed'
          ? `${venue.name}&&${venue.address1}&&${
              venue.adress2 ? venue.adress2 : ''
            }&&${venue.address3 ? venue.address3 : ''}&&${venue.city}`
          : 'Venue To Be Confirmed',
    },
    eventTitle: {
      'en-US': eventName,
    },
    blurb: {
      'en-US': description,
    },
  },
})
const processMeetupData = arrayOfMeetups => {
  let outputArray = []

  arrayOfMeetups.forEach(meetup => {
    const thisMeetup = {
      meetupId: meetup.id,
      name: meetup.name,
      url: meetup.link,
      urlname: meetup.urlname,
      nextEvent: meetup.next_event ? meetup.next_event.id : 0,
    }

    outputArray.push(thisMeetup)
  })

  return outputArray
}
const processMeetupEvent = eventObject => {
  console.log(eventObject.hasOwnProperty('venue'))
  console.log(eventObject.venue)
  let outputObject = {
    eventName: eventObject.name,
    duration: eventObject.duration,
    time: eventObject.time,
    localTime: eventObject.local_time,
    date: eventObject.local_date,
    venue: eventObject.hasOwnProperty('venue')
      ? {
          name: eventObject.venue.name,
          address1: eventObject.venue.address_1,
          address2: eventObject.venue.address_2
            ? eventObject.venue.address_2
            : 0,
          address3: eventObject.venue.address_3
            ? eventObject.venue.address_3
            : 0,
          city: eventObject.venue.city,
        }
      : 'Venue To Be Confirmed',
    link: eventObject.link,
    description:
      eventObject.description.includes('EVENT SUMMARY') &&
      eventObject.description.includes('EVENT DETAILS')
        ? striptags(
            eventObject.description
              .split('EVENT SUMMARY:')[1]
              .split('EVENT DETAILS')[0]
          ).trim()
        : 'For more information, please visit the Meetup page',
  }

  return outputObject
}

// Link API keys dot-env variables to instances
const meetup = require('meetup-api')({
  key: MEETUP_KEY,
})

const client = createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
})

// ----- Query Meetup
// getSelfGroups returns a list of Community objects, in order of how important the user is in each Community.
// If there is an upcoming event, this is included in the Community object.
const getSelfGroups = promisify(meetup.getSelfGroups.bind(meetup))

// getEvent returns event details - address, description etc
const getEvent = promisify(meetup.getEvent.bind(meetup))

exports.handler = async (event, context, callback) => {
  // Contentful user have many spaces. A space can have many environments.Each environment has entries of various "content models"
  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')

  // filter to return published entries that belong to a specific content model.
  const { items: events } = await environment.getEntries({
    limit: 1000,
    content_type: 'meetupEven',
  })

  // Maps through Community objects. If there is an upcominig event, the script either updates the Contentfu entry for that event if it exists, otherwise creates one.
  await Map(processMeetupData(await getSelfGroups()), async group => {
    const { urlname, nextEvent } = group

    if (!nextEvent) {
      return null
    }

    const meetup = processMeetupEvent(
      await getEvent({
        id: nextEvent,
        urlname,
      })
    )

    console.log(JSON.stringify(events))

    const ev = find(events, ['fields.linkToEvent.en-US', meetup.link])
    const entry = generateContentfulEvent({ ...meetup, ...group })

    if (ev) {
      // update
      ev.fields = Object.assign(ev.fields, entry.fields)
      console.log(`Updating entry ${meetup.eventName}`)
      const id = await ev.update()
      const updatedEntry = await environment.getEntry(id.sys.id)

      console.log(`Publishing updated entry ${meetup.eventName}`)
      return updatedEntry.publish()
    }

    // create
    console.log(`Creating entry ${meetup.eventName}`)
    const id = await environment.createEntry('meetupEven', entry)
    const newEntry = await environment.getEntry(id.sys.id)

    console.log(`Publishing creted entry ${meetup.eventName}`)
    return newEntry.publish()
  })
}
