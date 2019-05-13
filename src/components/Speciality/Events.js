import React from 'react'
import { format, isAfter, endOfYesterday } from 'date-fns'
import { Padding } from 'styled-components-spacing'

import specialityEventIcon from './assets/events-icon.svg'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import ExternalAnchor from '../Common/ExternalAnchor'
import StyledLink from '../Common/StyledLink'
import Hr from '../Common/Hr'

const CTA = {
  link: {
    withEvents: 'https://www.meetup.com/',
    withoutEvents: '/contact/'
  },
  text: {
    withEvents: 'More events',
    withoutEvents: 'Get in touch'
  }
}

const noEventsMessage = title =>
  `It looks like there currently aren’t any upcoming ${title} events. You can always check back again later or get in touch if you are interested in potentially hosting one.`

const isSpecialityEvent = (eventTitle, title) => {
  const formattedTitle = title
    .toLowerCase()
    .replace(/(\.|js)/gi, '')
    .trim()

  return eventTitle.toLowerCase().includes(formattedTitle)
}

const getSpecialityEvents = (title, events) =>
  events
    .filter(
      ({ eventTitle, startTime }) =>
        isSpecialityEvent(eventTitle, title) &&
        isAfter(startTime, endOfYesterday())
    )
    .sort((a, b) => (a.startTime <= b.startTime ? -1 : 1))
    .slice(0, 5)

const EventSection = ({ events, title, eventIcon }) => {
  const specialityEvents = events ? getSpecialityEvents(title, events) : []
  const hasEvents = !!specialityEvents.length

  return (
    <Grid>
      <Padding top={6} bottom={6}>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <div>
              <Padding bottom={1}>
                <img src={specialityEventIcon} alt="events icon" />
              </Padding>
              <SectionTitle>{`Upcoming ${title.trim()} events`}</SectionTitle>
            </div>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            {hasEvents ? (
              <ul>
                {specialityEvents.map(event => (
                  <li key={`${event.id}`}>
                    <Subtitle noPaddingBottom>
                      <ExternalAnchor href={event.linkToEvent}>
                        {event.eventTitle}
                      </ExternalAnchor>
                    </Subtitle>
                    <BodyPrimary noPaddingTop>
                      {format(event.startTime, 'MMMM DD[,] dddd')}
                    </BodyPrimary>
                    <Hr />
                  </li>
                ))}
              </ul>
            ) : (
              noEventsMessage(title)
            )}
            <Padding top={3}>
              <StyledLink
                external
                href={CTA.link[hasEvents ? 'withEvents' : 'withoutEvents']}
              >
                {CTA.text[hasEvents ? 'withEvents' : 'withoutEvents']}
              </StyledLink>
            </Padding>
          </Col>
        </Row>
      </Padding>
    </Grid>
  )
}
export default EventSection
