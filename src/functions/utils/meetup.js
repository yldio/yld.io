const moment = require('moment');

const { LOCALE } = require('./constants');

const transformGroups = groups =>
  groups.map(group => ({
    meetupId: group.id,
    name: group.name,
    url: group.link,
    urlname: group.urlname,
    nextEvent: group.next_event ? group.next_event.id : 0,
  }));

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
  group: { urlname },
}) => {
  const startTime = moment(`${local_date} ${local_time}`);
  const endTime = moment(startTime).add(duration, 'ms');

  return {
    fields: {
      id: {
        [LOCALE]: id,
      },
      meetupUrlName: {
        [LOCALE]: urlname,
      },
      linkToEvent: {
        [LOCALE]: link,
      },
      type: {
        [LOCALE]: 'Meetup',
      },
      date: {
        [LOCALE]: local_date,
      },
      startTime: {
        [LOCALE]: startTime.format('YYYY-MM-DDTH:mm:00'),
      },
      endTime: {
        [LOCALE]: endTime.format('YYYY-MM-DDTH:mm:00'),
      },
      address: {
        [LOCALE]:
          venue !== 'Venue To Be Confirmed'
            ? `${venue.name}&&${venue.address1}&&${
                venue.adress2 ? venue.adress2 : ''
              }&&${venue.address3 ? venue.address3 : ''}&&${venue.city}`
            : 'Venue To Be Confirmed',
      },
      venueName: { [LOCALE]: venue.name },
      addressLine1: venue.address_1 && { [LOCALE]: venue.address_1 },
      addressLine2: venue.adress_2 && { [LOCALE]: venue.adress_2 },
      addressLine3: venue.address_3 && { [LOCALE]: venue.address_3 },
      city: { [LOCALE]: venue.city },
      eventTitle: {
        [LOCALE]: name,
      },
      blurb: {
        [LOCALE]: description,
      },
      homepageFeatured: {
        [LOCALE]: false,
      },
      attendees: {
        [LOCALE]: attendees,
      },
    },
  };
};

module.exports = {
  transformGroups,
  generateContentfulEvent,
};
