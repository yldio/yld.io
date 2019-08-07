const striptags = require('striptags')

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


module.exports = { generateContentfulEvent, processMeetupData, processMeetupEvent }
