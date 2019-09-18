const moment = require('moment')

const transformGroups = groups =>
  groups.map(group => ({
    meetupId: group.id,
    name: group.name,
    url: group.link,
    urlname: group.urlname,
    nextEvent: group.next_event ? group.next_event.id : 0
  }))

const generateContentfulEvent = ({
  id,
  link,
  name,
  local_date,
  local_time,
  duration,
  venue,
  description,
  yes_rsvp_count: attendees,
  group: { urlname }
}) => {
  const startTime = moment(`${local_date} ${local_time}`)
  const endTime = moment(startTime).add(duration, 'ms')

  return {
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
      type: {
        'en-US': 'Meetup'
      },
      date: {
        'en-US': local_date
      },
      startTime: {
        'en-US': startTime.format('YYYY-MM-DDTH:mm:00')
      },
      endTime: {
        'en-US': endTime.format('YYYY-MM-DDTH:mm:00')
      },
      address: {
        'en-US':
          venue !== 'Venue To Be Confirmed'
            ? `${venue.name}&&${venue.address1}&&${
                venue.adress2 ? venue.adress2 : ''
              }&&${venue.address3 ? venue.address3 : ''}&&${venue.city}`
            : 'Venue To Be Confirmed'
      },
      venueName: { 'en-US': venue.name },
      addressLine1: venue.address_1 && { 'en-US': venue.address_1 },
      addressLine2: venue.adress_2 && { 'en-US': venue.adress_2 },
      addressLine3: venue.address_3 && { 'en-US': venue.address_3 },
      city: { 'en-US': venue.city },
      eventTitle: {
        'en-US': name
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
  }
}

module.exports = {
  transformGroups,
  generateContentfulEvent
}
