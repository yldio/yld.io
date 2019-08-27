import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import EventCard from '../src/components/Events/EventCard'
import { Grid } from '../src/components/grid'
import { CalendarDay } from '../src/components/Typography'

addDecorator(Theme)

const event = {
  type: 'Meetup',
  date: {
    day: 24,
    month: 'Aug'
  },
  eventName: 'GraphQL helps rockstar developers',
  eventLocation: 'London',
  startTime: '11am',
  endTime: '2pm',
  attendees: 20,
  link: 'www.event.com'
}

const calendarDayData = '24'

storiesOf('Event Card', module)
  .add('Event Card', () => {
    return (
      <Grid style={{ width: '100%' }}>
        <EventCard event={event} />
      </Grid>
    )
  })
  .add('Calendar Day', () => {
    // This is a Typography element only used in Event CalendarDay
    return <CalendarDay>{calendarDayData}</CalendarDay>
  })
