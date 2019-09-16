const striptags = require('striptags')

const transformGroups = groups =>
  groups.map(group => ({
    meetupId: group.id,
    name: group.name,
    url: group.link,
    urlname: group.urlname,
    nextEvent: group.next_event ? group.next_event.id : 0
  }))

const transformMeetupEvent = eventObject => ({
  eventName: eventObject.name,
  id: eventObject.id,
  duration: eventObject.duration,
  time: eventObject.time,
  localTime: eventObject.local_time,
  date: eventObject.local_date,
  attendees: eventObject.yes_rsvp_count,
  venue: eventObject.hasOwnProperty('venue')
    ? {
        name: eventObject.venue.name,
        address1: eventObject.venue.address_1,
        address2: eventObject.venue.address_2 ? eventObject.venue.address_2 : 0,
        address3: eventObject.venue.address_3 ? eventObject.venue.address_3 : 0,
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
})

const generateContentfulEvent = ({
  urlname,
  id,
  venue,
  link,
  date,
  time,
  duration,
  eventName,
  description,
  attendees
}) => ({
  fields: {
    id: {
      'en-US': id
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
    },
    attendees: {
      'en-US': attendees
    }
  }
})

module.exports = {
  transformGroups,
  transformMeetupEvent,
  generateContentfulEvent
}
