import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import ConferenceCard from '../src/components/Events/ConferenceCard'
import { Grid } from '../src/components/grid'
import placeholderImage from './assets/joyent72.svg'

addDecorator(Theme)

const event = {
  status: 'Upcoming',
  date: '21 August 2019',
  eventName: 'GraphQL helps rockstar developers',
  eventLocation: 'London',
  blurb:
    'GraphQL is an easy way to consume information. It is great. It can do CRUD. It is a perfect tool for rockstar devleopers. This conferencec will feature a number of excellent talks from GraphQL gurus who will show you their tips and tricks to get he best experience possible',
  homepage: 'www.event.com',
  ctaLink: 'www.event.com/tickets',
  svgImage: placeholderImage
}

const calendarDayData = '24'

storiesOf('Conference Card', module).add('Conference Card', () => {
  return (
    <Grid style={{ width: '100%' }}>
      <ConferenceCard event={event} />
    </Grid>
  )
})
