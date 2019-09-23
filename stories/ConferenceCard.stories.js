import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import ConferenceCard from '../src/components/Events/ConferenceCard'
import { Grid } from '../src/components/grid'

addDecorator(Theme)

const event = {
  startTime: '2019-05-03T18:00',
  endTime: '2019-05-03T20:30',
  date: '2019-05-03T00:00',
  attendees: null,
  type: 'Conference',
  eventTitle: 'ReactJS Girls Conference',
  address: '29–32 The Oval, London E2 9DT',
  addressLine1: '29–32 The Oval',
  addressLine2: null,
  addressLine3: 'E2 9DT',
  city: 'London',
  blurb: {
    blurb:
      'ReactJS Girls is a non-profit community conference for 300 React developers where women take the stage.'
  },
  homepageFeatured: false,
  linkToEvent: 'http://reactjsgirls.com',
  ctaText: 'Visit the website',
  eventImage: {
    file: {
      url:
        '//images.ctfassets.net/22g1lenhck4z/1soYNJmFH3GzCk3K8xGxtG/f4d62ba3f5858a3a11907bae5aae4512/reactgirl.svg'
    },
    fluid: {
      base64: null,
      aspectRatio: null,
      src: null,
      srcSet: null,
      srcWebp: null,
      srcSetWebp: null,
      sizes: null
    }
  }
}

storiesOf('Conference Card', module).add('Conference Card', () => {
  return (
    <Grid style={{ width: '100%' }}>
      <ConferenceCard event={event} />
    </Grid>
  )
})
