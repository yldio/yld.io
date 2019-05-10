require('dotenv').config()

const { createClient } = require('contentful-management')
const { default: Map } = require('apr-map')
const { promisify } = require('util')
const find = require('lodash.find')
const striptags = require('striptags')

// Set up dot-env variables
const { CONTENTFUL_SPACE, MEETUP_KEY, CMS_CRUD } = process.env

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
  description
}) => ({
  fields: {
    thisMeetupCode: {
      'en-US': `${urlname}-${nextEvent}`
    },
    meetupUrlName: {
      'en-US': urlname
    },
    linkToEvent: {
      'en-US': link
    },
    date: {
      'en-US': date
    },
    startTime: {
      'en-US': new Date(time)
    },
    endTime: {
      'en-US': new Date(time + duration)
    },
    address: {
      'en-US':
        venue !== 'Venue To Be Confirmed'
          ? `${venue.name}&&${venue.address1}&&${
              venue.adress2 ? venue.adress2 : ''
            }&&${venue.address3 ? venue.address3 : ''}&&${venue.city}`
          : 'Venue To Be Confirmed'
    },
    eventTitle: {
      'en-US': eventName
    },
    blurb: {
      'en-US': description
    },
    homepageFeatured: {
      'en-US': false
    }
  }
})
const processMeetupData = arrayOfMeetups => {
  let outputArray = []
  arrayOfMeetups.forEach(meetup => {
    const thisMeetup = {
      meetupId: meetup.id,
      name: meetup.name,
      url: meetup.link,
      urlname: meetup.urlname,
      nextEvent: meetup.next_event ? meetup.next_event.id : 0
    }

    outputArray.push(thisMeetup)
  })

  return outputArray
}
const processMeetupEvent = eventObject => {
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
          city: eventObject.venue.city
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
        : 'For more information, please visit the Meetup page'
  }

  return outputObject
}

// Link API keys dot-env variables to instances
const meetup = require('meetup-api')({
  key: MEETUP_KEY
})

const client = createClient({
  accessToken: CMS_CRUD
})

// ----- Query Meetup
// getSelfGroups returns a list of Community objects, in order of how important the user is in each Community.
// If there is an upcoming event, this is included in the Community object.
const getSelfGroups = promisify(meetup.getSelfGroups.bind(meetup))

// getEvent returns event details - address, description etc
const getEvent = promisify(meetup.getEvent.bind(meetup))

// DEBUGGING THE CONTENTFUL API (May 2019)
// https://www.contentful.com/developers/docs/references/content-management-api
//
// Client is defined above with the correct accessToken
//
// Figure out what *spaces* are there
// `const spaces = await client.getSpaces();`
// `console.log(space.items)`
// sys.id is the space ID
//
// Figure out what *environments* are there in a space
// `const environments = await client.getSpace({spaceID});
// `console.log(environment.items);
//
// Figure out the content types
// `const collections = await space.getContentTypes();`
// `console.log("content types are", collections.items);`
//
// Each content type has an ID that you can use as filter when calling `environment.getEntries({content_type: $contentTypeID})`
// You can also find the content type ID on its Contentful page that lists its fields. This info is on the right hand side of the window (easy to miss on wider screens)
//
// space.getEntries() will be depreciated, use space -> environment -> entries

exports.handler = async (event, context, callback) => {
  // Contentful user have many spaces. A space can have many environments.Each environment has entries of various "content models"
  console.log("I'm about to run meetup function")

  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')

  // filter to return published entries that belong to a specific content model.
  const { items: events } = await environment.getEntries({
    limit: 1000,
    content_type: 'meetupEven'
    // yes, the content type name is "meetupEven" - probably a typo during creation that can't be updated without recreating the contet from scratch
  })

  // Maps through Community objects. If there is an upcominig event, the script either updates the Contentfu entry for that event if it exists, otherwise creates one.
  await Map(processMeetupData(await getSelfGroups()), async group => {
    const { urlname, nextEvent } = group
    if (!nextEvent) {
      return null
    }

    console.log(urlname, nextEvent)

    const meetup = processMeetupEvent(
      await getEvent({
        id: nextEvent,
        urlname
      })
    )

    console.log(meetup)

    const ev = find(events, ['fields.linkToEvent.en-US', meetup.link])
    const entry = generateContentfulEvent({ ...meetup, ...group })

    console.log(ev)
    console.log(entry)

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
    // console.log(`Creating entry ${meetup.eventName}`)
    const id = await environment.createEntry('meetupEven', entry)
    const newEntry = await environment.getEntry(id.sys.id)

    // console.log(`Publishing creted entry ${meetup.eventName}`)
    return newEntry.publish()
  })

  return {
    statusCode: 200,
    body: 'Meetup function has finished running'
  }
}
