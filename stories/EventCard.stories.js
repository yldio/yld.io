import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import EventCard from '../src/components/Events/EventCard'
import { Grid } from '../src/components/grid'

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

storiesOf('Event Card', module).add('Event Card', () => {
  return (
    <Grid>
      <EventCard event={event} />
    </Grid>
  )
})
